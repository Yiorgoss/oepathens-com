<script lang="ts">
	import type { ISingleCard, Page } from '@payload-types';
	import * as Card from '@/components/ui/card';
	import { RichTextRender } from '../rich-text';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ISingleCard } = $props();
	const { richText, image, link, style } = $derived(blockData || {});
</script>

<Card.Root
	style={`background:${style?.background};border:${style?.border};border-radius:${style?.borderRadius};width:${style?.width};max-width:${style?.maxWidth};justify-content:${style?.alignY};`}
	class="hover:scale-105 max-w-md h-full w-full justify-center items-center"
>
	<a href={(link as Page)?.slug} aria-hidden={!(link as Page)?.slug}>
		<Card.Header>
			<div style:justify-content={style?.alignX} style:align-items={style?.alignY} class="flex">
				<Image class="items-center rounded-lg p-5 " {image} />
			</div>
		</Card.Header>
		<Card.Content class="h-full">
			<RichTextRender
				overrides="prose-headings:text-background prose-p:text-background p-2"
				{richText}
			/>
		</Card.Content>
	</a>
</Card.Root>
