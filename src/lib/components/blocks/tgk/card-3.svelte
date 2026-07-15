<script lang="ts">
	import type { ITGKCard3 } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Image from '@/components/common/image.svelte';

	const { blockData }: { blockData: ITGKCard3 } = $props();
</script>

<section id="TGKCard3" class="">
	<div
		style:background={blockData.style?.background}
		style:padding={blockData.style?.padding}
		style:border={blockData.style?.border}
		style:border-radius={blockData.style?.borderRadius}
		class="hover:scale-105 h-full"
	>
		<div class="grid grid-cols-1 items-center">
			<div class="relative row-span-1 h-full w-full">
				<Image class="h-full w-full " image={blockData.image} />
				<div
					class="absolute bottom-0 right-0 left-0 translate-y-1/2 flex justify-center items-center"
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
			<div
				style:padding-top={blockData.midStyle?.width && `calc(${blockData.midstyle?.width}/2)px`}
				class="row-span-1 flex justify-center items-start relative h-auto pt-10"
			>
				<div class="">
					<RichTextRender richText={blockData.richText} />
				</div>
			</div>
		</div>
	</div>
</section>
