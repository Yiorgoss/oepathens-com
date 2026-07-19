<script lang="ts">
	import type { ITextUnderCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';
	import { page } from '$app/state';

	const { blockData }: { blockData: ITextUnderCard } = $props();
	const { locale } = $derived(page.params);

	let href = $derived.by(() => {
		const { urlType, url, reference } = blockData || {};
		// custom url
		if (urlType == 'custom' && url) return url;
		// internal url
		if (urlType == 'reference' && reference) {
			//@ts-ignore
			const slug = reference.value.slug; //slug is present if depth > 0 because of defaultPopulate
			return locale ? `/${locale}/${slug}` : `/${slug}`;
		}

		return null;
	});
</script>

<section id="TextUnderCard-block" class="w-full h-full overflow-hidden max-w-sm">
	<a {href} aria-disabled={!href}>
		<Card.Root
			class="max-w-sm w-full h-full bg-transparent items-start justify-start border-0 shadow-none text-foreground"
		>
			<div class="w-full hover:scale-105 transition-transform duration-200 overflow-hidden">
				<Image class="h-100 " image={blockData?.image} />
			</div>
			<div class="">
				<RichTextRender richText={blockData?.richText} />
			</div>
		</Card.Root>
	</a>
</section>
