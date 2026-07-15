<script lang="ts">
	import type { ITGKCard3 } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ITGKCard3 } = $props();
	$inspect({ blockData });
</script>

<section id="TGKCard3" class="">
	<div
		style:background={blockData.style?.background}
		style:padding={blockData.style?.padding}
		style:border={blockData.style?.border}
		style:border-radius={blockData.style?.borderRadius}
		class="overflow-hidden"
	>
		<div class="grid grid-rows-2 grid-cols-1 items-center">
			<div class="h-full w-full">
				<Image class="h-full w-full" image={blockData.image} />
			</div>
			<div class="bg-background flex justify-center items-start relative h-full">
				<div class="pt-10">
					<RichTextRender richText={blockData.richText} />
				</div>
				<div
					class=" absolute top-0 right-0 left-0 -translate-y-1/2 flex justify-center items-center"
				>
					<div
						style:background={blockData.midStyle?.background}
						style:border={blockData.midStyle?.border}
						style:height={blockData.midStyle?.width}
						style:width={blockData.midStyle?.width}
						class="bg-background flex justify-center items-center border-3 rounded-full h-20 w-20"
					>
						<RichTextRender overrides="text-center" richText={blockData.middleText} />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
