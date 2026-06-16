<script lang="ts">
	import type { ICutoutCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';

	const { blockData }: { blockData: ICutoutCard } = $props();
	const CLIP_PATH = { id: 'cutoutCard', w: 40, h: 25, xInc: 4, yInc: 4 };
</script>

<section id="cutout-card-block">
	<div class="relative grid grid-col-1 grid-row-1">
		<div class="clip-img -scale-x-100 row-start-1 col-start-1">
			<Image image={blockData.image} class="-scale-x-100" />
		</div>
		<div class="row-start-1 col-start-1 absolute bottom-10 sm:bottom-10 left-0 sm:left-7">
			<Button link={blockData.link} />
		</div>
	</div>
	<SVGRender name="cutout-main" data={CLIP_PATH} />
</section>

<style>
	.clip-img {
		-webkit-clip-path: url(#cutoutCard);
		clip-path: url(#cutoutCard);
	}
</style>
