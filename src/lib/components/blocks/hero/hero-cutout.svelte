<script lang="ts">
	import { type IHeroCutout } from '@payload-types';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';
	import { onMount, setContext } from 'svelte';

	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import EmailOnlyForm from '@/components/blocks/forms/email-only-form.svelte';
	import ContactForm from '../forms/contact-form.svelte';
	import SVGRender from '@/components/common/svg/svg-render.svelte';

	const { blockData, cb }: { blockData: IHeroCutout; cb?: () => void } = $props();
	const { image, richText, form } = $derived(blockData);

	onMount(() => {
		cb && cb();
	});
	// let element = $state() as HTMLElement;
	let CUTOUT_DIMENSIONS = { w: 37, h: 35, xInc: 3, yInc: 5 };

	const clipped = new MediaQuery('min-width: 1024px');
	let offsetWidth = $state() as number;
	let offsetHeight = $state() as number;
</script>

<svelte:window />
<section id="block_hero_cutout">
	<div
		class="p-2 md:p-10 md:pt-[calc(var(--header-height)*1.2)] pt-[calc(var(--header-height)*1.2)] lg:min-h-auto h-full lg:h-lvh w-full bg-background"
	>
		<div class="h-full w-full">
			<div
				bind:offsetWidth
				bind:offsetHeight
				class="container overflow-hidden mx-auto grid grid-rows-[2] lg:grid-rows-1 grid-cols-1 lg:gap-0 gap-10 h-full w-full"
			>
				<div
					class="clip-cutout-main max-h-full md:max-h-lvh opacity-40 h-full w-full col-start-1 row-start-1"
				>
					<Image {image} class=" rounded-md " />
				</div>
				<div
					style={`width:calc(100% - ${clipped.current ? CUTOUT_DIMENSIONS.w * offsetWidth * 0.01 : '0'}px);`}
					class="h-full p-4 flex justify-center items-end col-start-1 row-start-1"
				>
					<RichTextRender {richText} />
				</div>
				<div
					class="relative col-start-1 row-start-2 lg:row-start-1 clip-cutout-small w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-full"
				>
					<div
						style={`width:${!clipped.current ? 'auto' : `${offsetWidth * (CUTOUT_DIMENSIONS.w - CUTOUT_DIMENSIONS.xInc) * 0.01}px`};
									height:${!clipped.current ? 'auto' : `${offsetHeight * (CUTOUT_DIMENSIONS.h - CUTOUT_DIMENSIONS.yInc) * 0.01}px`};`}
						class="relative lg:absolute bottom-0 right-0 flex justify-center items-center mx-auto"
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
