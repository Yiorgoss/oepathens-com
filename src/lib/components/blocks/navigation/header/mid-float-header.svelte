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
	import { scroll } from 'motion';
	import { untrack } from 'svelte';

	const { blockData }: { blockData: IMidFloadHeader } = $props();

	const { image, left, right } = $derived(blockData);
	const { locale, slug } = $derived(page.params);

	let scrollY = $state(0);
	let previous = $state(0);
	let hidden = $state(false);

	$effect(() => {
		const prev = untrack(() => previous);

		if (prev - scrollY <= 0 && scrollY > 100) {
			hidden = true;
		} else {
			hidden = false;
		}
		previous = scrollY;
	});

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

<svelte:window bind:scrollY />
<section id="MidFloadHeader" class="h-full">
	<div
		style:inset={blockData.style?.inset}
		class="fixed top-0 fflex justify-center w-lvw z-30 h-(--header-height) px-0 md:px-0"
	>
		<div class="w-full h-full md:max-w-full">
			<Nav.Root viewport={false} class="block w-full min-w-full " orientation="horizontal">
				<!-- desktop -->
				<Nav.List
					style={`background:${blockData.style?.background};`}
					class={cn(
						'px-0 transition-transform ease-in-out duration-300 bg-background shadow-xl mmax-w-full rounded-none w-full mx-auto items-center justify-center h-full hidden lg:grid grid-cols-10',
						hidden && '-translate-y-full'
					)}
				>
					<div class="col-span-4 flex justify-around items-center">
						{#if Object.entries(supportedLocales).length > 1}
							<Nav.Item class="px-2 ">
								<LocaleSwitcher useFlag />
							</Nav.Item>
						{/if}
						{#each left ?? [] as { nLink }}
							{@render nestedLink({ nLink })}
						{/each}
					</div>
					<!--  careful with the magic flex basis number!!  -->
					<Nav.Item class="col-span-2">
						<Nav.Link
							href={`/${locale ?? ''}`}
							aria-label="home page"
							class="hover:bg-transparent focus:bg-transparent"
						>
							<div class="h-(--header-height) mx-auto lg:p-2 md:p-0 w-auto">
								<Image
									alt="link to homepage"
									class="p-2 object-contain mx-auto w-auto h-full "
									{image}
									sizes="500px"
									fetchpriority="high"
									loading="eager"
								/>
							</div>
						</Nav.Link>
					</Nav.Item>
					<div class="flex justify-around col-span-4">
						{#each right ?? [] as { nLink }}
							{@render nestedLink({ nLink })}
						{/each}
					</div>
				</Nav.List>
				<!-- mobile -->
				<div class="w-full px-0 lg:hidden">
					<!--  <div class="min-w-full flex grow w-full h-auto items-center justify-end md:hidden">  -->
					<Sheet.Root bind:open>
						<div
							style:background={blockData.style?.background}
							class={cn(
								' py-2 px-4 flex justify-between rounded-none items-center h-full w-full transition-transform ease-out duration-200 shadow-xl',
								hidden && '-translate-y-full'
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
									class="focus-visible:ring-offset-background size-8 justify-center items-center flex mr-4 p-2 max-md:focus-visible:outline-hidden"
								>
									<Icon name="lucide:menu" size="24px" />
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
								'whitespace-break-spaces font-semibold m-0 w-full p-2 h-auto hover:bg-transparent dark:hover:bg-transparent hover:text-primary/50 text-center max-md:focus-visible:ring-0 ',
								activeLink == nLink && 'text-primary underline underline-offset-6 '
							)}
							link={nLink?.arr[0].link}
						/>
					{/snippet}
				</Nav.Link>
			{:else}
				<!--  Trigger must com after because we need to use peer  -->
				<Nav.Trigger
					class="focus-visible:focus:bg-transparent max-md:focus-visible:ring-0 w-fit p-2 py-3 h-auto hover:bg-accent text-center whitespace-normal"
				>
					<span
						class:underline={activeLink == nLink}
						class:underline-offset-6={activeLink == nLink}
						class:text-primary={activeLink == nLink}
						class="font-semibold"
					>
						{nLink.name}
					</span>
				</Nav.Trigger>
				<Nav.Content>
					<ul class=" flex flex-col justify-start items-start gap-1 md:min-w-30 lg:min-w-40">
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
