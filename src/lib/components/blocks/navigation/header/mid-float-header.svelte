<script lang="ts">
	import type { IMidFloadHeader, INestedLink } from '@payload-types';
	import * as Nav from '@/components/ui/navigation-menu';
	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';
	import * as Sheet from '@/components/ui/sheet';
	import { cn } from '@/utils';
	import { page } from '$app/state';
	import LocaleSwitcher from '@/components/common/locale-switcher.svelte';
	import { supportedLocales } from '@/config';
	import Icon from '@/components/common/icon.svelte';

	const { blockData }: { blockData: IMidFloadHeader } = $props();

	const { image, left, right } = $derived(blockData);

	const { locale } = page.params;

	let open = $state(false);
</script>

<section id="MidFloadHeader" class="">
	<div
		style:inset={blockData.style?.inset}
		class="fixed top-2 flex justify-center w-screen z-30 h-(--header-height) px-2 md:px-0"
	>
		<div class="container w-full h-full">
			<!-- desktop -->
			<Nav.Root
				viewport={false}
				orientation="horizontal"
				class={cn(
					'px-0 md:px-10 bg-background shadow-xl max-w-full rounded-theme w-full items-center justify-between md:flex'
				)}
			>
				<Nav.List class="hidden md:grid grid-cols-7 justify-items-center items-center ">
					{#each left ?? [] as { nLink }}
						{@render nestedLink({ nLink })}
					{/each}
					<Nav.Item>
						<Nav.Link href={`/${locale ?? ''}`} aria-label="home page" class="">
							<div class="h-(--header-height) lg:p-2 md:p-4 w-auto">
								<Image
									alt="link to homepage"
									class="p-2 object-contain"
									{image}
									sizes="500px"
									fetchpriority="high"
									loading="eager"
								/>
							</div>
						</Nav.Link>
					</Nav.Item>
					{#each right ?? [] as { nLink }}
						{@render nestedLink({ nLink })}
					{/each}
					{#if Object.entries(supportedLocales).length > 0}
						<Nav.Item class="px-2">
							<LocaleSwitcher useFlag />
						</Nav.Item>
					{/if}
				</Nav.List>
				<!-- mobile -->
				<div class="flex w-full h-full items-center justify-end md:hidden">
					<Sheet.Root bind:open>
						<div
							class={cn(
								'bg-background flex justify-between rounded-theme items-center h-full w-full transition-transform ease-out duration-200 shadow-xl'
							)}
						>
							<a href={`/${locale ?? ''}`} aria-label="home page" class="h-full px-2">
								<div class="h-full p-2 lg:p-2 md:p-4">
									<!--  max width needed on picture to prevent wierd img grow on safari  -->
									<Image
										class="object-contain h-full max-w-(--header-height)"
										loading="eager"
										{image}
									/>
								</div>
							</a>
							<Sheet.Trigger class="h-full ">
								<div
									aria-label="navigation menu "
									class="focus-visible:ring-offset-background size-8 justify-center items-center flex mr-4 p-2 focus-visible:outline-hidden"
								>
									<Icon name="lucide:menu" />
								</div>
							</Sheet.Trigger>
						</div>
						<Sheet.Content class="flex flex-col items-center justify-start pt-[20vh] ">
							<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
							<Nav.List class="flex h-full w-full flex-col items-center justify-center ">
								<div>
									{#each [...left, ...right] as { nLink }}
										{@render nestedLink({ nLink })}
									{/each}
									<Nav.Item class="py-2 px-4">
										<LocaleSwitcher useFlag />
									</Nav.Item>
								</div>
							</Nav.List>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</Nav.Root>
		</div>
	</div>
</section>

{#snippet nestedLink({ nLink }: { nLink: INestedLink })}
	<Nav.Item class="py-2 px-4">
		{#if nLink.arr.length == 1}
			<Nav.Link class="">
				{#snippet child()}
					<Button class="py-2 px-0 h-auto" link={nLink.arr[0].link} />
				{/snippet}
			</Nav.Link>
		{:else}
			<Nav.Trigger class="">{nLink.name}</Nav.Trigger>
			<Nav.Content class="" data-motion={false}>
				<ul class=" flex flex-col gap-1 md:w-30 lg:w-40">
					{#each nLink.arr ?? [] as { link }}
						<Nav.Link>
							{#snippet child()}
								<Button class="py-2 h-auto" {link} />
							{/snippet}
						</Nav.Link>
					{/each}
				</ul>
			</Nav.Content>
		{/if}
	</Nav.Item>
{/snippet}
