<script lang="ts">
	import { type IHeroCutout } from '@payload-types';
	import { onMount } from 'svelte';

	import Image from '@/components/common/image.svelte';
	import { clipped } from '@/utils/media-queries.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import ContactForm from '../forms/contact-form.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';

	const { blockData, cb }: { blockData: IHeroCutout; cb?: () => void } = $props();
	const { image, richText, form } = $derived(blockData);

	onMount(() => {
		cb?.();
	});
	// let element = $state() as HTMLElement;
	let CUTOUT_DIMENSIONS = { w: 37, h: 35, xInc: 3, yInc: 5 };

	let offsetWidth = $state() as number;
	let offsetHeight = $state() as number;
</script>

<svelte:window />
<section id="block_hero_cutout">
	<div
		class="bg-background h-full w-full p-2 pt-[calc(var(--header-height)*1.2)] md:p-10 md:pt-[calc(var(--header-height)*1.2)] lg:h-lvh lg:min-h-auto"
	>
		<div class="h-full w-full">
			<div
				bind:offsetWidth
				bind:offsetHeight
				class="container mx-auto grid h-full w-full grid-cols-1 grid-rows-[2] gap-10 overflow-hidden lg:grid-rows-1 lg:gap-0"
			>
				<div
					class="clip-cutout-main col-start-1 row-start-1 h-full max-h-full w-full opacity-40 md:max-h-lvh"
				>
					<Image {image} class=" rounded-md " />
				</div>
				<div
					style={`width:calc(100% - ${clipped.current ? CUTOUT_DIMENSIONS.w * offsetWidth * 0.01 : '0'}px);`}
					class="col-start-1 row-start-1 flex h-full items-end justify-center p-4"
				>
					<RichTextRender {richText} />
				</div>
				<div
					class="clip-cutout-small relative col-start-1 row-start-2 mx-auto w-full sm:w-3/4 md:w-1/2 lg:row-start-1 lg:w-full"
				>
					<div
						style={`width:${!clipped.current ? 'auto' : `${offsetWidth * (CUTOUT_DIMENSIONS.w - CUTOUT_DIMENSIONS.xInc) * 0.01}px`};
									height:${!clipped.current ? 'auto' : `${offsetHeight * (CUTOUT_DIMENSIONS.h - CUTOUT_DIMENSIONS.yInc) * 0.01}px`};`}
						class="relative right-0 bottom-0 mx-auto flex items-center justify-center lg:absolute"
					>
						<div class="w-3/4 md:w-full xl:w-3/4">
							<ContactForm {form} design="oneLineEmail" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<SVGRender name="cutout-main" data={CUTOUT_DIMENSIONS} />
	<SVGRender name="cutout-small" data={CUTOUT_DIMENSIONS} />
</section>

<style>
	@media (width >= 1024px) {
		/*same as tailwind lg*/

		.clip-cutout-main {
			-webkit-clip-path: url(#cutoutMain);
			clip-path: url(#cutoutMain);
		}
		.clip-cutout-small {
			-webkit-clip-path: url(#cutoutSmall);
			clip-path: url(#cutoutSmall);
		}
	}
</style>
