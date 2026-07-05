<script lang="ts">
	import type { ITGKCardIcons } from '@payload-types';
	import Icon from '@/components/common/icon.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';

	const { blockData }: { blockData: ITGKCardIcons } = $props();
</script>

<section id="TGKCardIcons" class="">
	<div
		style:background={blockData.style?.background}
		style:height={blockData.style?.height}
		style:width={blockData.style?.width}
		class=" max-w-md w-full"
	>
		{#each blockData.arr ?? [] as { icon, richText }}
			<div class="grid grid-cols-5">
				<div class="col-span-1 flex justify-center items-start">
					<Icon {icon} />
				</div>
				<div class="col-span-4">
					<RichTextRender {richText} />
				</div>
			</div>
		{/each}
	</div>
</section>
