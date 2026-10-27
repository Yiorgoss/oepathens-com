<script lang="ts">
	import { type IStickerField } from '@payload-types';
	import { site } from '@/config';
	import { mobile } from '@/utils/media-queries.svelte';
	import { cn } from '@/utils';

	const { data, class: className }: { data: IStickerField | undefined; class?: string } = $props();
</script>

{#if data?.url}
	<div
		style:top={mobile.current ? data?.mobileStyles?.top : data?.style?.top}
		style:bottom={mobile.current ? data?.mobileStyles?.bottom : data?.style?.bottom}
		style:left={mobile.current ? data?.mobileStyles?.left : data?.style?.left}
		style:right={mobile.current ? data?.mobileStyles?.right : data?.style?.right}
		style:translate={mobile.current ? data?.mobileStyles?.translate : data?.style?.translate}
		style:border-radius={data.style?.borderRadius}
		class="absolute isolate z-20 overflow-hidden"
	>
		<img
			style:width={data?.style?.width ?? data?.url?.width ?? 'auto'}
			style:height={data?.style?.height ?? data?.url?.height ?? '100px'}
			src={`${site.storage}/${data?.url?.filename}`}
			class={cn('', className)}
			alt=""
		/>
	</div>
{/if}
