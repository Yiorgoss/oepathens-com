<script lang="ts">
	import type { IFooter3 } from '@payload-types';
	import Button from '@/components/common/button.svelte';
	import Image from '@/components/common/image.svelte';
	import Sticker from '@/components/common/sticker.svelte';

	const { blockData }: { blockData: IFooter3 } = $props();
</script>

<section
	id="Footer3"
	style:border-radius={blockData.style?.borderRadius}
	style:background={blockData.style?.background}
	class="relative"
>
	<div class="container relative mx-auto py-10">
		<div class="w-full py-10">
			<Image image={blockData.logo} class="h-25 object-contain" />
		</div>
		<div class="grid grid-cols-2 md:grid-cols-6 gap-5 justify-around items-start w-full">
			{#each blockData.list as { links, header, horizontal }, i}
				{@const k = 3}
				{@const lastRow = blockData.list?.length % k}
				<div
					class:col-span-full={lastRow == 1 && blockData.list?.length - 1 == i}
					class:col-span-3={lastRow == 2 && blockData.list?.length - 2 <= i}
					class="col-span-2"
				>
					<div
						style:color={blockData.headerStyles?.background}
						class="text-lg font-bold text-center pt-2 text-primary"
					>
						{header}
					</div>
					<div class:flex-row={horizontal} class="flex flex-col justify-center items-center">
						{#each links as { link }}
							<Button {link} class="h-auto px-0" />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	{#if blockData.madeBy}
		<div class=" px-4 mx-auto flex container lg:w-3/4">
			<a
				href="https://calisto.studio"
				target="_blank"
				class="font-thin py-4 uppercase underline underline-offset-4 hover:no-underline text-sm"
			>
				<span class="sr-only">(opens in new tab)</span>
				Website crafted with love by Calisto Studio
			</a>
		</div>
	{/if}
	<Sticker data={blockData.s} />
</section>
