<script lang="ts">
	let {
		blockData,
		className,
		cb,
		hasLocaleSwitch,
		ref = $bindable(null),
		...restProps
	}: {
		blockData: any;
		className?: string;
		cb?: () => void;
		hasLocaleSwitch?: boolean;
		ref?: HTMLElement | null;
		restProps?: Record<string, unknown>;
	} = $props();

	// FIX figure out a glob match this will become unmnageable at some point
	const dynamicResolveBlock = async ({ blockName }: { blockName: string }) => {
		switch (blockName) {
			case 'calistoLanding':
				return import('./hero/calisto-landing.svelte');
			case 'heroCutout':
				return import('./hero/hero-cutout.svelte');
			case 'mediumHero':
				return import('./hero/medium-hero.svelte');
			case 'scrollGrowLanding':
				return import('./hero/scroll-grow-landing.svelte');
			case 'gradientBG':
				return import('./hero/gradient-bg.svelte');
			case 'videoLanding':
				return import('./hero/video-landing.svelte');
			case 'stickyContainers':
				return import('./special/sticky-containers.svelte');
			case 'bentoGrid':
				return import('./special/bento-grid.svelte');
			case 'accordion':
				return import('./special/accordion.svelte');
			case 'carousel':
				return import('./special/carousel.svelte');
			case 'wavyText':
				return import('./special/wavy-text.svelte');
			case 'calistoFeatureCard':
				return import('./cards/calisto-feature-card.svelte');
			case 'discountCard':
				return import('./cards/discount-card.svelte');
			case 'singleCard':
				return import('./cards/single-card.svelte');
			case 'hoverCard':
				return import('./cards/hover-card.svelte');
			case 'blockColumnLayout':
				return import('./layout/block-column-layout.svelte');
			case 'image':
				return import('./common/image.svelte');
			case 'gutter':
				return import('./common/gutter.svelte');
			case 'gutterv2':
				return import('./common/gutter-v2.svelte');
			case 'clipGutter':
				return import('./common/clip-gutter.svelte');
			case 'rtBlock':
				return import('./rich-text/block.svelte');
			case 'imageHeader':
				return import('./navigation/header/image-header.svelte');
			case 'floatingHeader':
				return import('./navigation/header/floating-header.svelte');
			case 'midFloatHeader':
				return import('./navigation/header/mid-float-header.svelte');
			case 'richTextFooter':
				return import('./navigation/footer/rich-text-footer.svelte');
			case 'googleMapFooter':
				return import('./navigation/footer/google-map-footer.svelte');
			case 'contactForm':
				return import('./forms/contact-form.svelte');
			case 'marquee':
				return import('./special/marquee.svelte');
			case 'richTextCard':
				return import('./cards/rich-text-card.svelte');
			case 'infoBanner':
				return import('./banners/info-banner.svelte');
			case 'emboldenEpubConverter':
				return import('./unique/embolden/epub-converter.svelte');
			case 'flexboxLayout':
				return import('./layout/flexbox-layout.svelte');
			case 'button':
				return import('./common/button-block.svelte');
			case 'cutoutCard':
				return import('./cards/cutout-card.svelte');
			case 'footerDesign2':
				return import('./navigation/footer/footer-design-2.svelte');
			case 'flexItem':
				return import('./special/flex-item.svelte');
			case 'textUnderCard':
				return import('./cards/text-under-card.svelte');
			case 'textImageSplit':
				return import('./tgk/text-image-split.svelte');
			case 'tgkLandingHome':
				return import('./tgk/tgk-landing-home.svelte');
			case 'tgkCard1':
				return import('./tgk/card-1.svelte');
			case 'tgkCard2':
				return import('./tgk/card-2.svelte');
			case 'tgkDoilyCard':
				return import('./tgk/card-doily.svelte');
			case 'tgkGridIcons':
				return import('./tgk/tgk-grid-icons.svelte');
			case 'tgkCardIcons':
				return import('./tgk/tgk-card-icons.svelte');
			case 'tgkAccordion':
				return import('./tgk/tgk-accordion.svelte');
		}
	};

	let calculatedBlockType = $state();
	$effect(() => {
		dynamicResolveBlock({ blockName: blockData?.blockType ?? undefined }).then(
			(data) => (calculatedBlockType = data)
		);
	});

	// let calculatedBlockType = $derived(
	// 	await dynamicResolveBlock({ blockName: blockData?.blockType ?? undefined })
	// );
</script>

{#if calculatedBlockType && calculatedBlockType.default}
	{@const Block = calculatedBlockType.default}
	<Block {className} {blockData} {cb} {hasLocaleSwitch} bind:ref {...restProps} />
{/if}
