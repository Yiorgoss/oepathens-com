<script lang="ts">
	import type { IGoogleMapFooter } from '@payload-types';
	import Button from '@/components/common/button.svelte';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '../../rich-text';

	const { blockData }: { blockData: IGoogleMapFooter } = $props();
</script>

<section id="GoogleMapFooter" style:background={blockData.style.background}>
	<div class="container mx-auto py-10">
		<div class="w-full py-10">
			<Image image={blockData.logo} class="h-25 object-contain" />
		</div>
		<div class="grid grid-cols-2 md:grid-cols-6 gap-5 justify-around items-start w-full">
			{#each blockData.list as { links, header, horizontal }, i}
				{@const k = 3}
				{@const lastRow = blockData.list.length % k}
				<div
					class:col-span-full={lastRow == 1 && blockData.list.length - 1 == i}
					class:col-span-3={lastRow == 2 && blockData.list.length - 2 <= i}
					class="col-span-2"
				>
					<div class="text-lg font-bold text-center py-2">{header}</div>
					<div class:flex-row={horizontal} class="flex flex-col justify-center items-center">
						{#each links as { link }}
							<Button {link} class="h-auto px-0" />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="px-4 mx-auto flex flex-col gap-10 md:gap-15 container last:pb-10">
		{#each blockData.locations as { richText, iframe }}
			<div
				class="flex max-md:flex-col-reverse min-h-100 justify-around max-md:items-center md:pt-10 gap-8 basis-1/2"
			>
				<div
					class="flex grow shrink basis-auto w-full justify-start md:justify-center items-center"
				>
					<RichTextRender {richText} />
				</div>
				<div class="flex grow shrink basis-auto w-full pb-6">
					{@html iframe}
				</div>
			</div>
		{/each}
	</div>
</section>
