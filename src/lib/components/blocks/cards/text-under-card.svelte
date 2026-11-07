<script lang="ts">
	import type { ITextUnderCard } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';
	import { mobile } from '@/utils/media-queries.svelte';

	const { blockData }: { blockData: ITextUnderCard } = $props();
</script>

<section
	id="TextUnderCard-block"
	style:margin={mobile.current ? blockData.mobileStyle?.margin : blockData.style?.margin}
	style:overflow={blockData.style?.overflow}
	style:border-radius={blockData.style?.borderRadius}
	class:max-w-sm={!blockData.style?.maxWidth}
	class="h-full w-full overflow-hidden"
>
	<Card.Root
		style={`max-width:${blockData.style?.maxWidth}; padding:${blockData.style?.padding}`}
		class="text-foreground h-full w-full max-w-sm items-start justify-start border-0 bg-transparent py-0 shadow-none"
	>
		<div
			style:overflow={blockData?.style?.overflow}
			class="w-full overflow-hidden transition-transform duration-200"
		>
			<Image class="h-100 " image={blockData?.image} />
		</div>
		<div class="">
			<RichTextRender richText={blockData?.richText} />
		</div>
	</Card.Root>
</section>
