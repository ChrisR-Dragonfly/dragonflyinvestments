"""Build dist/dragonfly-theme-v<version>.zip with forward-slash entry names (portable to Linux hosts).
Run from wp-theme/:  python package.py
"""
import re, zipfile
from pathlib import Path

theme = Path("dragonfly")
version = re.search(r"^Version:\s*(\S+)", (theme / "style.css").read_text(encoding="utf-8"), re.M).group(1)
out = Path("dist") / f"dragonfly-theme-v{version}.zip"
out.parent.mkdir(exist_ok=True)
skip = {".DS_Store", "Thumbs.db"}
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in sorted(theme.rglob("*")):
        if p.is_file() and p.name not in skip:
            z.write(p, p.as_posix())  # "dragonfly/inc/helpers.php"
with zipfile.ZipFile(out) as z:
    names = z.namelist()
    tops = sorted({n.split("/")[0] for n in names})
    bad = [n for n in names if "\\" in n]
print(f"{out}: {out.stat().st_size/1e6:.1f} MB, {len(names)} files, top-level: {tops}, backslash entries: {len(bad)}")
