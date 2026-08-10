<script lang="ts">
	import { type IStickerField } from '@payload-types';
	import { site } from '@/config';
	import { MediaQuery } from 'svelte/reactivity';
	import { cn } from '@/utils';

	const { data, class: className }: { data: IStickerField | undefined; class?: string } = $props();
	const mobile = new MediaQuery('max-width: 768px');
</script>

{#if data?.url}
	<div
		style:top={mobile.current ? data?.mobileStyles?.top : data?.style?.top}
		style:bottom={mobile.current ? data?.mobileStyles?.bottom : data?.style?.bottom}
		style:left={mobile.current ? data?.mobileStyles?.left : data?.style?.left}
		style:right={mobile.current ? data?.mobileStyles?.right : data?.style?.right}
		style:translate={mobile.current ? data?.mobileStyles?.translate : data?.style?.translate}
		class="absolute isolate z-50"
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
