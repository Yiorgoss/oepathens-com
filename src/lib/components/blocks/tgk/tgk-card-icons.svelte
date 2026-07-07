<script lang="ts">
	import type { ITGKCardIcons } from '@payload-types';
	import Icon from '@/components/common/icon.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';

	const { blockData }: { blockData: ITGKCardIcons } = $props();
</script>

<section id="TGKCardIcons" class="">
	<div
		style:background={blockData.style?.background}
		style:border={blockData.style?.border}
		style:border-radius={blockData.style?.borderRadius}
		style:height={blockData.style?.height ?? '100%'}
		style:width={blockData.style?.width}
		style:padding={blockData.style?.padding ?? '20px'}
		class="w-full"
	>
		{#each blockData.arr ?? [] as { icon, richText }}
			<div class="flex gap-2">
				<div class=" flex justify-center items-start">
					<Icon {icon} />
				</div>
				<div class="">
					<RichTextRender {richText} />
				</div>
			</div>
		{/each}
	</div>
</section>
