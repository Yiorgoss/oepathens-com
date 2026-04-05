<script lang="ts">
	import type { ITextUnderCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';

	const { blockData }: { blockData: ITextUnderCard } = $props();
</script>

<section id="TextUnderCard-block" class="opacity-40 bg-blue-300">
	<Card.Root>
		<div class="">
			<Image image={blockData?.image} />
		</div>
		<div class="">
			<RichTextRender richText={blockData?.richText} />
		</div>
	</Card.Root>
</section>
