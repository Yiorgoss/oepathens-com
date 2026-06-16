<script lang="ts">
	const {
		blockData,
		className,
		cb,
		hasLocaleSwitch,
		...restProps
	}: {
		blockData: any;
		className?: string;
		cb?: () => void;
		hasLocaleSwitch?: boolean;
		restProps?: Record<string, unknown>;
	} = $props();

	// FIX figure out a glob match this will become unmnageable at some point
	const dynamicResolveBlock = async ({ blockName }: { blockName: string }) => {
		switch (blockName) {
			case 'calistoLanding':
				return import('./hero/calisto-landing.svelte');
			case 'mediumHero':
				return import('./hero/medium-hero.svelte');
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
			case 'contactForm':
				return import('./forms/contact-form.svelte');
			case 'scrollGrowLanding':
				return import('./hero/scroll-grow-landing.svelte');
			case 'marquee':
				return import('./special/marquee.svelte');
			case 'richTextCard':
				return import('./cards/rich-text-card.svelte');
			case 'infoBanner':
				return import('./banners/info-banner.svelte');
			case 'gradientBG':
				return import('./hero/gradient-bg.svelte');
			case 'emboldenEpubConverter':
				return import('./unique/embolden/epub-converter.svelte');
			case 'heroCutout':
				return import('./hero/hero-cutout.svelte');
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
	<Block {className} {blockData} {cb} {hasLocaleSwitch} {...restProps} />
{/if}
