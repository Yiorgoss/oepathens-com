<script lang="ts">
	import { type ICalistoFeatureCard } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Icon from '@/components/common/icon.svelte';
	import { animate } from '@/attachments/animations/animate.svelte';

	const { blockData }: { blockData: ICalistoFeatureCard } = $props();
	const { cards, animation, style } = $derived(blockData);
</script>

<section id="feature-card" class="container mx-auto">
	<div
		{@attach animate({ animation })}
		style:padding={style?.padding}
		class="flex flex-col flex-wrap justify-center items-center md:items-stretch gap-10 md:flex-row"
	>
		{#if cards}
			{#each cards as { richText, icon }}
				<div
					class="animate-child max-w-xs md:max-w-sm w-full hover:scale-105 transition-transform mt-10 duration-300"
				>
					<div class="relative flex-auto h-full">
						<div
							style:background={style?.background}
							style:min-height={style?.minHeight}
							class="bg-primary h-full flex flex-col rounded-3xl p-10"
						>
							<RichTextRender
								overrides="prose-headings:text-background prose-p:text-background"
								{richText}
							/>
						</div>
						<div class="absolute top-0 left-1/6 overflow-hidden -translate-y-1/2 rounded-xs">
							<Icon class=" text-background" {icon} />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>
