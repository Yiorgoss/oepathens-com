<script lang="ts">
	import Icon from '@/components/common/icon.svelte';
	import { type ITGKAccordion } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Button from '@/components/common/button.svelte';
	import * as Accordion from '@/components/ui/accordion';

	const { blockData }: { blockData: IAccordion } = $props();

	const { list, link, icon } = $derived(blockData);
	//TODO: accordion trigger doesnt have child prop??
</script>

<section
	style:padding={blockData.style?.padding}
	style:background={blockData.style?.background}
	class="w-full mx-auto px-2"
>
	<div
		class:container={blockData.style?.container}
		style:width={blockData.style?.width}
		class="mx-auto w-full"
	>
		<Accordion.Root class="w-full max-w-screen" type="multiple">
			{#each list || [] as item, i}
				<Accordion.Item value={`acc-item-${i}`} class="group border-0 w-full ">
					<div style:padding={blockData.style?.gap}>
						<Accordion.Trigger
							class="flex font-serif font-semibold font-2xl w-full items-center justify-between select-none [&[data-state=open]svg]:rotate-180 hover:border-2 border-0 border-primary rounded-none px-0 py-0"
						>
							{#snippet child({ props })}
								<div
									style:background={blockData.btnStyle?.background}
									style:border={blockData.btnStyle?.border}
									style:border-radius={blockData.btnStyle?.borderRadius}
									style:padding={blockData.btnStyle?.padding}
									{...props}
								>
									<span class="font-lg max-md:font-xl font-bold grow">
										{item.title}
									</span>
									<span
										class="bg-transparent hover:bg-dark-10 inline-flex size-8 items-center justify-center group-has-data-[state=open]:rotate-180 transition-transform duration-200"
									>
										<Icon {icon} class="transition-all duration-200" />
									</span>
								</div>
							{/snippet}
						</Accordion.Trigger>
					</div>
					<Accordion.Content
						class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm tracking-[-0.01em] border-0"
					>
						<div
							style:padding={blockData.dropStyle?.padding}
							style:background={blockData.dropStyle?.background}
							style:border={blockData.dropStyle?.border}
							style:border-radius={blockData.dropStyle?.borderRadius}
							class="overflow-hidden"
						>
							<RichTextRender richText={item.richText} />
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
