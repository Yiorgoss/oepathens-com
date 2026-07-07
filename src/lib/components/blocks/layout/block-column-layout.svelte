<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { type IBlockColumnLayout } from '@payload-types';

	import RenderBlocks from '../render-blocks.svelte';
	import Image from '@/components/common/image.svelte';
	import Sticker from '@/components/common/sticker.svelte';
	import { cn } from '@/utils';
	import { animate } from '@/attachments/animations/animate.svelte';
	import { onMount } from 'svelte';

	const { blockData, cb }: { blockData: IBlockColumnLayout; cb?: () => void } = $props();
	const { layout, columnOne, columnTwo, columnThree, style, mobileStyle, animation } =
		$derived(blockData);

	onMount(() => {
		cb && cb();
	});

	const normaliseWidth = (layout: string) => {
		const cssList = [];
		switch (layout) {
			case 'oneColumn':
				cssList.push('md:w-full');
				cssList.push('md:w-0');
				cssList.push('md:w-0');
				break;
			case 'halfAndHalf':
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0'); //flex-[1_1_0] w-0
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'oneTwoThird':
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:grow-2 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'twoOneThird':
				cssList.push('md:grow-2 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'threeColumns':
				cssList.push('max-w-sm w-full');
				cssList.push('max-w-sm w-full');
				cssList.push('max-w-sm w-full');
				break;
		}
		return cssList;
	};

	const widthClass = $derived(normaliseWidth(layout ?? 'oneColumn'));

	const mobile = new MediaQuery('max-width: 768px');
	const sizes = $derived(
		layout == 'oneColumn'
			? '100vw'
			: layout == 'threeColumns'
				? '(max-width:600px) 100vw, 33vw'
				: '(max-width:600px) 100vw, 50vw'
	);
</script>

<section
	id="block-column-layout"
	style:height={style?.height}
	style:min-height={style?.minHeight}
	style:background={style?.color}
	style:border-radius={style?.borderRadius}
	class="mx-auto relative grid grid-cols-1 grid-rows-1"
>
	<div class="absolute inset-0">
		<Image image={blockData?.bgImage} />
	</div>
	<div class="row-start-1 col-start-1">
		{#each blockData?.stickerList ?? [] as sticker}
			<Sticker data={sticker.s} />
		{/each}
	</div>
	<div
		style:overflow={style?.overflow}
		style:gap={style?.gap}
		style:padding={mobile.current ? mobileStyle?.padding : style?.padding}
		style:flex-direction={mobile.current ? (mobileStyle?.flexDirection ?? 'column') : 'row'}
		style:align-items={style?.alignY}
		style:justify-content={style?.alignX}
		class:flex-wrap={layout == 'threeColumns'}
		class:container={style?.container}
		class="col-start-1 overflow-hidden row-start-1 flex z-10 gap-0 md:gap-10 justify-center items-center md:items-stretch h-full w-full flex-col md:flex-row mx-auto"
		{@attach animate({ animation })}
	>
		<div
			style:align-items={mobile.current ? (mobileStyle?.alignY ?? style?.alignY) : style?.alignY}
			style:justify-content={mobile.current
				? (mobileStyle?.alignX ?? style?.alignX)
				: style?.alignX}
			style:height={blockData?.itemHeight?.split(',')[0]}
			style:display="flex"
			class={cn(
				'animate-child w-full flex grow justify-center items-center md:items-stretch',
				widthClass[0]
			)}
		>
			{#if columnOne && columnOne.length != 0}
				<RenderBlocks blockData={columnOne[0]} {sizes} />
			{/if}
		</div>
		{#if columnTwo && columnTwo.length != 0}
			<!--  known bug -> cannot have 3 col 1_0_1 - must have soomething in second one for third to be active  -->
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				style:height={blockData?.itemHeight?.split(',')[1]}
				style:display="flex"
				class={cn(
					'animate-child w-full flex grow justify-center items-center md:items-stretch',
					widthClass[1]
				)}
			>
				<RenderBlocks blockData={columnTwo[0]} {sizes} />
			</div>
		{/if}
		{#if columnThree && columnThree.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				style:height={blockData?.itemHeight?.split(',')[2]}
				style:display="flex"
				class={cn(
					'animate-child w-full flex grow justify-center items-center md:items-stretch',
					widthClass[2]
				)}
			>
				<RenderBlocks blockData={columnThree[0]} {sizes} />
			</div>
		{/if}
	</div>
</section>
