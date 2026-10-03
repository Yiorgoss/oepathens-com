<script lang="ts">
	import type { IImage } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { cn } from '@/utils';
	import { onMount } from 'svelte';

	// Interim shape until the CMS `serviceCard` block exists and generates `IServiceCard`.
	type IServiceCard = {
		image?: IImage['image'];
		time?: string | null;
		title?: string | null;
		style?: {
			background?: string | null;
			borderRadius?: string | null;
			padding?: string | null;
			maxWidth?: string | null;
		};
	};

	let {
		blockData,
		className,
		cb,
		ref = $bindable(null),
		...restProps
	}: {
		blockData: IServiceCard;
		className?: string;
		cb?: () => void;
		ref?: HTMLElement | null;
		restProps?: Record<string, unknown>;
	} = $props();

	const { image, time, title, style } = $derived(blockData || {});

	onMount(() => cb && cb());
</script>

<section
	id="ServiceCard-block"
	style:max-width={style?.maxWidth}
	class={cn('h-full w-full', className)}
>
	<article
		bind:this={ref}
		style:background={style?.background}
		style:border-radius={style?.borderRadius}
		class="bg-white text-foreground flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-md"
		{...restProps}
	>
		<div class="relative aspect-square w-full overflow-hidden">
			<Image class="h-full w-full object-cover" {image} />
			{#if time}
				<span
					class="text-foreground absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide"
				>
					{time}
				</span>
			{/if}
		</div>
		{#if title}
			<p style:padding={style?.padding} class="px-4 py-3 text-sm font-semibold tracking-wide">
				{title}
			</p>
		{/if}
	</article>
</section>
