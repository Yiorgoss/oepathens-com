<script lang="ts">
	import type { IMidFloadHeader, INestedLink, Page } from '@payload-types';
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
	const { locale, slug } = $derived(page.params);

	let open = $state(false);

	let activeLink = $derived.by(() => {
		/*
	this little cancerous funciton simply combines all the available links,
	iterates them until we find the active link then returns it to be used to set styles later on
	  */
		let activeNest;
		[...(left ?? []), ...(right ?? [])].forEach(({ nLink }) => {
			if (!nLink) return;
			if (!nLink.arr) return;
			nLink.arr.forEach(({ link }) => {
				/* @ts-ignore -- reference.value will always have a slug because of default populate */
				if (link?.reference?.value.slug == slug?.split(',')[0]) {
					activeNest = nLink;
				}
			});
		});
		return activeNest;
	});
</script>

<section id="MidFloadHeader" class="">
	<div
		style:inset={blockData.style?.inset}
		class="fixed top-2 flex justify-center w-lvw z-30 h-(--header-height) px-2 md:px-0"
	>
		<div class="container w-full h-full md:max-w-full md:px-2 lg:container">
			<!-- desktop -->
			<Nav.Root viewport={false} class="w-full min-w-full" orientation="horizontal">
				<Nav.List
					style={`background:${blockData.style?.background};`}
					class="px-0 lg:px-10 mx-auto bg-background shadow-xl max-w-full rounded-2xl w-full items-center justify-center h-full hidden md:flex"
				>
					<div class="grow shrink basis-0 flex w-full items-center justify-around">
						{#if Object.entries(supportedLocales).length > 0}
							<Nav.Item class="px-2 ">
								<LocaleSwitcher useFlag />
							</Nav.Item>
						{/if}
						{#each left ?? [] as { nLink }}
							{@render nestedLink({ nLink })}
						{/each}
					</div>
					<!--  careful with the magic flex basis number!!  -->
					<Nav.Item class="grow-0 w-full shrink basis-60 lg:basis-80">
						<Nav.Link href={`/${locale ?? ''}`} aria-label="home page" class="">
							<div class="h-(--header-height) lg:p-2 md:p-0 w-auto">
								<Image
									alt="link to homepage"
									class="p-2 object-contain w-full h-auto"
									{image}
									sizes="500px"
									fetchpriority="high"
									loading="eager"
								/>
							</div>
						</Nav.Link>
					</Nav.Item>
					<div class="flex grow shrink basis-0 justify-around items-center">
						{#each right ?? [] as { nLink }}
							{@render nestedLink({ nLink })}
						{/each}
					</div>
				</Nav.List>
				<!-- mobile -->
				<div class="w-full md:hidden">
					<!--  <div class="min-w-full flex grow w-full h-auto items-center justify-end md:hidden">  -->
					<Sheet.Root bind:open>
						<div
							style:background={blockData.style?.background}
							class={cn(
								' py-2 px-4 flex justify-between rounded-2xl items-center h-full w-full transition-transform ease-out duration-200 shadow-xl'
							)}
						>
							<a href={`/${locale ?? ''}`} aria-label="home page" class="h-full px-2">
								<div class="h-full p-2 lg:p-2 md:p-4">
									<!--  max width needed on picture to prevent wierd img grow on safari  -->
									<Image class="object-contain h-full max-w-50" loading="eager" {image} />
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
						<Sheet.Content
							style={`background:${blockData.style?.background};`}
							class="flex flex-col items-center justify-start pt-[20vh] "
						>
							<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
							<Nav.List class="flex h-full w-full flex-col items-center justify-center ">
								<div>
									{#each [...left, ...right] as { nLink }}
										{@render nestedLink({ nLink })}
									{/each}
									<Nav.Item class="py-2 ">
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

{#snippet nestedLink({ nLink }: { nLink: INestedLink | undefined | null })}
	{#if nLink}
		<Nav.Item class="py-2 px-0 w-fit">
			{#if nLink?.arr?.length == 1}
				<Nav.Link class="">
					{#snippet child()}
						<Button
							onclick={() => (open = false)}
							class={cn(
								'whitespace-nowrap m-0 w-full p-2 h-auto ',
								activeLink == nLink && 'text-primary'
							)}
							link={nLink?.arr[0].link}
						/>
					{/snippet}
				</Nav.Link>
			{:else}
				<!--  Trigger must com after because we need to use peer  -->
				<Nav.Trigger class="w-fit p-2 h-auto whitespace-normal">
					<span class:text-primary={activeLink == nLink}>
						{nLink.name}
					</span>
				</Nav.Trigger>
				<Nav.Content>
					<ul class=" flex flex-col justify-start items-start gap-1 md:w-30 lg:w-40">
						{#each nLink.arr ?? [] as { link }}
							<Nav.Link>
								{#snippet child()}
									<Button onclick={() => (open = false)} class="py-2 h-auto" {link} />
								{/snippet}
							</Nav.Link>
						{/each}
					</ul>
				</Nav.Content>
			{/if}
		</Nav.Item>
	{/if}
{/snippet}
