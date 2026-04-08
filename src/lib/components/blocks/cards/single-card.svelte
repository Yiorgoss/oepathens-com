<script lang="ts">
	import type { ISingleCard, Page } from '@payload-types';
	import * as Card from '@/components/ui/card';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ISingleCard } = $props();
	const { richText, image, link, style } = $derived(blockData || {});
</script>

<Card.Root
	style={`background:${style?.background};border:${style?.border};border-radius:${style?.borderRadius};max-width:${style?.maxWidth};`}
	class="h-full w-full"
>
	<a href={(link as Page)?.slug} aria-hidden={!(link as Page)?.slug}>
		<Card.Header>
			<div style:justify-content={style?.alginX} style:align-items={style?.alignY} class="flex">
				<Image class="rounded-lg p-5 " {image} />
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
