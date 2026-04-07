<script lang="ts">
	import { type Asset, type IImage } from '@payload-types';
	import { site } from '@/config';
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import Sticker from './sticker.svelte';
	import { animate } from '@/attachments/animations/animate.svelte';

	let {
		image,
		class: className,
		cb,
		sizes: _sizes,
		loading = 'lazy',
		fetchpriority = 'low'
	}: {
		image: IImage['image'];
		class?: string;
		cb?: () => void;
		sizes?: 'string';
		loading?: 'eager' | 'lazy' | null | undefined;
		fetchpriority?: 'low' | 'auto' | 'high' | null | undefined;
	} = $props();

	let { style, alt, ignoreSizes, animation, stickerList } = $derived(image || {});

	let asset = $derived((image?.url as Asset) || {});
	onMount(() => cb && cb());

	let loaded = $state(false);

	let { srcset, sizes } = $derived.by(() => {
		let { srcset, sizes } = Object.values(asset?.sizes ?? {}).reduce(
			(acc: any, cur: any) => ({
				srcset: `${acc.srcset ?? ''} ${site.storage}/${encodeURI(cur.filename)} ${cur.width}w,`,
				sizes: `${acc.sizes ?? ''} (max-width: ${cur.width}px) 100vw, `
			}),
			{ srcset: '', sizes: '' }
		);
		srcset += `${site.storage}/${encodeURI(asset?.filename ?? '')} ${asset?.width}w`;
		sizes += `${asset?.width}px`; //defaultvalue

		return { srcset, sizes };
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
		class="relative grid grid-cols-1 grid-rows-1 place-items-center h-full w-full overflow-hidden bg-(image:--placeholder) bg-center bg-cover bg-no-repeat"
		style:--placeholder={`url(${site.storage}/${asset?.sizes?.placeholder?.filename})`}
		style:height={style?.height}
		style:width={style?.width}
		style:padding={style?.padding}
		style:border-radius={style?.borderRadius}
	>
		<div class:hidden={loaded} class="absolute inset-0 bg-white/40 animate-pulse"></div>
		{#if ignoreSizes}
			<img
				style:object-fit={style?.objectFit}
				style:object-position={style?.objectPosition}
				onload={() => (loaded = true)}
				src={`${site.storage}/${encodeURI(asset?.filename ?? '')}`}
				class={cn(
					'object-cover w-full h-full col-start-1 row-start-1 ease-in-out transition-all duration-200',
					className
				)}
				{alt}
				{loading}
				{fetchpriority}
				{@attach animate({ animation })}
			/>
		{:else}
			<img
				style:object-fit={style?.objectFit}
				style:object-position={style?.objectPosition}
				onload={() => (loaded = true)}
				class={cn(
					'object-cover w-full h-full col-start-1 row-start-1 ease-in-out transition-all duration-200',
					className
				)}
				style:opacity={loaded ? '100%' : '0'}
				alt={alt ?? ''}
				sizes={_sizes ?? sizes}
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
			{#each stickerList ?? [] as sticker}
				<Sticker data={sticker.s} />
			{/each}
		</div>
	</div>
{/if}
