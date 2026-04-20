<script lang="ts">
	import type { ITextUnderCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';

	const { blockData }: { blockData: ITextUnderCard } = $props();
</script>

<section id="TextUnderCard-block" class="w-full max-w-md">
	<Card.Root class="max-w-md w-full bg-transparent h-full border-0 shadow-none text-foreground">
		<div class="w-full h-full">
			<Image class="max-h-100" image={blockData?.image} />
		</div>
		<div class="">
			<RichTextRender richText={blockData?.richText} />
		</div>
	</Card.Root>
</section>
