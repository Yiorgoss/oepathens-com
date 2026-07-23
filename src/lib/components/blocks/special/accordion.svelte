<script lang="ts">
	import Icon from '@/components/common/icon.svelte';
	import { type IAccordion } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Button from '@/components/common/button.svelte';
	import * as Accordion from '@/components/ui/accordion';

	const { blockData }: { blockData: IAccordion } = $props();

	const { list, link, icon } = $derived(blockData);
	//TODO: accordion trigger doesnt have child prop??
</script>

<section class="w-full px-2 max-w-4xl md:px-4 lg:px-10">
	<Accordion.Root class="w-full " type="multiple">
		{#each list || [] as item, i}
			<Accordion.Item value={`acc-item-${i}`} class="group border-dark-10 border-b px-1.5 w-full ">
				<Accordion.Trigger
					class="flex font-serif text-3xl w-full items-center justify-between py-5 transition-all duration-200 select-none [&[data-state=open]>span>svg]:rotate-180"
				>
					{#snippet child({ props })}
						<button class="flex justify-between" {...props}>
							<span class="">{i + 1}.</span>
							<span class="font-normal grow">
								{item.title}
							</span>
							<span
								class="bg-transparent hover:bg-dark-10 inline-flex size-8 items-center justify-center rounded-[7px]"
							>
								<Icon {icon} class="transition-all duration-200" />
							</span>
						</button>
					{/snippet}
				</Accordion.Trigger>
				<Accordion.Content
					class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm tracking-[-0.01em]"
				>
					<div class="pb-[25px]">
						<RichTextRender richText={item.richText} />
					</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
	{#if link?.display?.text}
		<div class="py-5 md:pt-10">
			<Button size="lg" {link} />
		</div>
	{/if}
</section>
