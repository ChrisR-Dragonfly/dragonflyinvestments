<?php
/**
 * Fallback template. Every real page has its own template file.
 */
get_header();
?>
<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto">
		<?php while ( have_posts() ) : the_post(); ?>
			<h1 class="text-4xl md:text-5xl font-bold text-[#1A3770] mb-6"><?php the_title(); ?></h1>
			<div class="text-[#333333] leading-relaxed"><?php the_content(); ?></div>
		<?php endwhile; ?>
	</div>
</section>
<?php
get_footer();
