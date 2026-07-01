<script lang="ts">
	import { type Asset, type IImage } from '@payload-types';
	import { site } from '@/config';
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import Sticker from './sticker.svelte';
	import { animate } from '@/attachments/animations/animate.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	let {
		ref = $bindable(null),
		image,
		class: className,
		cb,
		alt: altHardCoded,
		sizes: _sizes,
		loading = 'lazy',
		fetchpriority = 'low'
	}: {
		ref?: HTMLImageElement | null;
		image: IImage['image'];
		class?: string;
		alt?: string;
		cb?: () => void;
		sizes?: string;
		loading?: 'eager' | 'lazy' | null | undefined;
		fetchpriority?: 'low' | 'auto' | 'high' | null | undefined;
	} = $props();

	let { style, alt, mobileStyle, ignoreSizes, animation, arr } = $derived(image || {});

	let asset = $derived((image?.url as Asset) || {});
	onMount(() => cb && cb());

	const mobile = new MediaQuery('max-width: 480px');
	let loaded = $state(false);

	let { srcset } = $derived.by(() => {
		let { srcset } = Object.values(asset?.sizes ?? {}).reduce(
			(acc: any, cur: any) => ({
				srcset: `${acc.srcset ?? ''} ${site.storage}/${encodeURI(cur.filename)} ${cur.width}w,`
			}),
			{ srcset: '' }
		);
		srcset += `${site.storage}/${encodeURI(asset?.filename ?? '')} ${asset?.width}w`;

		return { srcset };
	});
</script>

<svelte:head>
	{#if asset?.sizes?.placeholder?.filename}
		<link
			rel="preload"
			as="image"
			fetchpriority="high"
			href={`${site.storage}/${asset?.sizes?.placeholder.filename}`}
			media={`(max-width: ${asset?.sizes?.placeholder.width}px)`}
		/>
	{/if}
	{#if asset?.sizes?.sm?.filename}
		<!--  always preload mobile image  -->
		<link
			rel="preload"
			fetchpriority="high"
			as="image"
			href={`${site.storage}/${asset?.sizes?.sm.filename}`}
			media={`(max-width: ${asset?.sizes?.sm.width}px)`}
		/>
	{/if}
</svelte:head>

{#if asset?.sizes}
	<div
		class:bg-none={loaded}
		class="relative grid grid-cols-1 grid-rows-1 items-center justify-center h-full w-full bg-(image:--placeholder) bg-center bg-cover bg-no-repeat overflow-hidden"
		style:--placeholder={`url(${site.storage}/${asset?.sizes?.placeholder?.filename})`}
		style:height={style?.height}
		style:width={style?.width}
		style:padding={mobile.current ? mobileStyle?.padding : style?.padding}
		style:border-radius={style?.borderRadius}
	>
		<div class:hidden={loaded} class="absolute inset-0 bg-white/60 animate-pulse"></div>
		{#if ignoreSizes}
			<img
				bind:this={ref}
				style:object-fit={style?.objectFit}
				style:object-position={style?.objectPosition}
				onload={() => (loaded = true)}
				src={`${site.storage}/${encodeURI(asset?.filename ?? '')}`}
				class={cn(
					'object-cover w-full h-full col-start-1 row-start-1 ease-in-out transition-all duration-200',
					className
				)}
				alt={alt ?? altHardCoded ?? ''}
				{loading}
				{fetchpriority}
				{@attach animate({ animation })}
			/>
		{:else}
			<img
				bind:this={ref}
				style:object-fit={style?.objectFit}
				style:object-position={style?.objectPosition}
				onload={() => (loaded = true)}
				class={cn(
					'object-cover w-full h-full col-start-1 row-start-1 ease-in-out transition-all duration-200',
					className
				)}
				style:opacity={loaded ? '100%' : '0'}
				alt={alt ?? altHardCoded ?? ''}
				sizes={_sizes ?? style?.sizes ?? `min(${asset?.width}px, 100vw)`}
				{srcset}
				{loading}
				{@attach animate({ animation })}
			/>
		{/if}
		<div
			style:opacity={style?.opacity}
			style:background={style?.background}
			style:mix-blend-mode={style?.mixBlendMode}
			class="col-start-1 row-start-1 h-full w-full"
		></div>
		<div class="col-start-1 relative row-start-1 h-full w-full">
			{#each arr ?? [] as sticker}
				<Sticker data={sticker.s} />
			{/each}
		</div>
	</div>
{/if}
