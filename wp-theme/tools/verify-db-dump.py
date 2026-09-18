"""Verify an UpdraftPlus database dump (-db.gz) actually contains the site.

Usage:  python wp-theme/tools/verify-db-dump.py <path-to-db.gz> [table_prefix]

UpdraftPlus writes the dump as MANY gzip blocks stitched together, one per table. Tools that stop after
the first block (PHP gzdecode, some archive viewers) show only a 1 KB header. Python's gzip module reads
every block, which is why this script uses it.
"""
import gzip
import re
import sys

path = sys.argv[1]
prefix = sys.argv[2] if len(sys.argv) > 2 else "mpi_"
sql = gzip.open(path, "rb").read().decode("utf-8", "ignore")
fails = []


def check(label, ok, detail=""):
    print(f"  {'PASS' if ok else 'FAIL'}  {label}{('  ' + detail) if detail else ''}")
    if not ok:
        fails.append(label)


print(f"file: {path}")
print(f"uncompressed SQL: {len(sql) / 1e6:.1f} MB\n")
print("header:")
for line in sql.splitlines()[:9]:
    print("   ", line[:110])

tables = re.findall(r"^CREATE TABLE `([^`]+)`", sql, re.M)
print(f"\ntables: {len(tables)}")
core = ["posts", "postmeta", "options", "users", "usermeta", "terms", "term_taxonomy",
        "term_relationships", "termmeta", "comments", "commentmeta", "links"]
missing = [prefix + t for t in core if prefix + t not in tables]
check("all 12 WordPress core tables present", not missing, str(missing) if missing else "")
corrupt = [t for t in tables if t.lower().endswith(("wfknownfilelist", "wfpendingissues"))]
check("the two corrupt Wordfence tables are NOT in the dump (skipped on purpose)", not corrupt, str(corrupt) if corrupt else "")
rev = [t for t in tables if "revslider" in t]
check("Slider Revolution tables present (the XML export cannot carry these)", len(rev) > 0, f"{len(rev)} tables")

# every table that was created should also have been closed out; count tables that received rows
inserted = set(re.findall(r"^INSERT INTO `([^`]+)`", sql, re.M))
print(f"  info  tables with data: {len(inserted)} of {len(tables)} (empty tables are normal)")


def option(name):
    """Value of a wp_options row. Rows look like (id, 'name', 'value', 'autoload')."""
    m = re.search(r"\(\d+,\s*'" + re.escape(name) + r"',\s*'((?:[^'\\]|\\.)*)'", sql)
    return m.group(1) if m else None


print("\nkey options:")
expect = {"siteurl": None, "home": None, "blogname": None, "template": None, "stylesheet": None,
          "show_on_front": None, "page_on_front": None, "permalink_structure": None}
for key in expect:
    val = option(key)
    print(f"    {key:22} {val[:90] if val else val}")
    check(f"option '{key}' present", val is not None)
check("theme options blob (option_tree) present", option("option_tree") is not None)

# pages: rows in the posts table whose post_type is 'page'
posts_block = "\n".join(re.findall(r"^INSERT INTO `" + re.escape(prefix) + r"posts` VALUES .*?;\s*$", sql, re.M | re.S))
page_rows = len(re.findall(r"'page',\s*'[^']*',\s*\d+\)", posts_block))
print(f"\npages (post_type = page, all statuses incl. revisions' parents): {page_rows}")
check("at least the 26 known pages are present", page_rows >= 26, f"found {page_rows}")
for title in ["Front Page", "About Us", "Our Team", "Portfolio", "Acquisition Criteria", "Contact",
              "Privacy Policy", "Login Page", "Staff Directory", "Our Investment Principles", "googledrivetest"]:
    check(f"page title in dump: {title}", ("'" + title + "'") in posts_block)

portfolio_rows = len(re.findall(r"'portfolio',\s*'[^']*',\s*\d+\)", posts_block))
check("portfolio custom-post-type entries present", portfolio_rows >= 27, f"found {portfolio_rows}")

# UpdraftPlus splits big tables across several INSERT statements, so count rows in all of them.
user_blocks = re.findall(r"^INSERT INTO `" + re.escape(prefix) + r"users` VALUES (.*?);\s*$", sql, re.M | re.S)
n_users = sum(len(re.findall(r"\(\d+,\s*'[^']*',\s*'\$", b)) for b in user_blocks)
check("user accounts present", n_users > 0, f"{n_users} account(s)")

print("\nfreshness (proves this is the CURRENT site, not an old copy):")
check("corrected email info@dragonflyri.com is in the dump", "info@dragonflyri.com" in sql)
check("old typo 'draognflyri' is gone", "draognflyri" not in sql)

print(f"\n{'ALL CHECKS PASSED' if not fails else str(len(fails)) + ' CHECK(S) FAILED: ' + ', '.join(fails)}")
sys.exit(1 if fails else 0)
