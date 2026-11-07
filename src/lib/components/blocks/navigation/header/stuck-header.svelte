<script lang="ts">
	import type { IHeaderStuckHeader, INestedLink } from '@payload-types';
	import * as Nav from '@/components/ui/navigation-menu';
	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';
	import * as Sheet from '@/components/ui/sheet';
	import { cn } from '@/utils';
	import { page } from '$app/state';
	import LocaleSwitcher from '@/components/common/locale-switcher.svelte';
	import { supportedLocales } from '@/config';
	import Icon from '@/components/common/icon.svelte';

	const { blockData }: { blockData: IHeaderStuckHeader } = $props();

	const { image, list, style } = $derived(blockData);
	const { locale, slug } = $derived(page.params);
	let open = $state(false);

	/*
		style.height is applied inline like every other block and is deliberately not published
		to the global --header-height token, so the page offset (pt-(--header-height) in
		routes/[[locale=locale]]/[...slug]/+page.svelte) keeps its app.css default when a tenant
		sets a different height.
	*/

	const activeLink = $derived.by(() => {
		/* same active-link resolution as left-align-header */
		const currentSlug = slug?.split(',')[0];
		let activeNest: INestedLink | undefined;
		(list ?? []).forEach(({ nLink }) => {
			nLink?.arr?.forEach(({ link }) => {
				const reference = link?.reference;
				/* a populated reference is a Page, a bare id cannot match a slug */
				if (!reference || typeof reference.value == 'number') return;
				if (reference.value.slug == currentSlug) activeNest = nLink;
			});
		});
		return activeNest;
	});
</script>

<section id="stuckHeader">
	<div
		class="bg-background fixed inset-x-0 top-0 z-40 h-(--header-height)"
		style:background={style?.background}
		style:height={style?.height}
	>
		<Nav.Root
			viewport={false}
			class="block h-full w-full min-w-full lg:[&>div:first-child]:h-full"
			orientation="horizontal"
		>
			<!-- desktop -->
			<Nav.List class="hidden h-full w-full items-center lg:flex">
				<div class="flex h-full w-full items-center" class:container={style?.container}>
					<Nav.Item class="h-full">
						<Nav.Link
							href={`/${locale ?? ''}`}
							aria-label="home page"
							class="h-full hover:bg-transparent focus:bg-transparent"
						>
							<div class="flex h-full items-center px-2 lg:px-4">
								<div class="h-full max-w-60 overflow-hidden">
									<Image
										alt="link to homepage"
										class="h-full w-full object-contain p-2"
										{image}
										sizes="500px"
										fetchpriority="high"
										loading="eager"
									/>
								</div>
							</div>
						</Nav.Link>
					</Nav.Item>
					<div
						class="flex flex-1 items-center justify-end gap-2"
						style:gap={style?.gap}
						style:justify-content={style?.alignX}
					>
						{#if Object.entries(supportedLocales).length > 1}
							<Nav.Item class="px-2">
								<LocaleSwitcher useFlag />
							</Nav.Item>
						{/if}
						{#each list ?? [] as { nLink }, i (i)}
							{@render nestedLink({ nLink })}
						{/each}
					</div>
				</div>
			</Nav.List>
			<!-- mobile -->
			<div class="h-full w-full lg:hidden [&>div]:h-full">
				<Sheet.Root bind:open>
					<Nav.List class="flex h-full w-full items-center justify-between px-4">
						<Nav.Item class="h-full">
							<Nav.Link
								href={`/${locale ?? ''}`}
								aria-label="home page"
								class="h-full hover:bg-transparent focus:bg-transparent"
							>
								<div class="flex h-full items-center p-2">
									<!--  max width needed on picture to prevent weird img growth on safari  -->
									<div class="h-full max-w-50 overflow-hidden">
										<Image class="h-full w-full object-contain" loading="eager" {image} />
									</div>
								</div>
							</Nav.Link>
						</Nav.Item>
						<Sheet.Trigger class="h-full" aria-label="navigation menu">
							<div
								class="mr-4 flex size-8 items-center justify-center p-2 max-md:focus-visible:outline-hidden"
							>
								<Icon name="lucide:menu" size="24px" />
							</div>
						</Sheet.Trigger>
					</Nav.List>
					<Sheet.Content
						style={`background:${style?.background};`}
						class="flex flex-col items-center justify-start border-0 pt-[20vh] shadow-none"
					>
						<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
						<Nav.List class="flex h-full w-full flex-col items-center justify-center">
							<div>
								{#each list ?? [] as { nLink }, i (i)}
									{@render nestedLink({ nLink })}
								{/each}
								{#if Object.entries(supportedLocales).length > 1}
									<Nav.Item class="px-2">
										<LocaleSwitcher useFlag />
									</Nav.Item>
								{/if}
							</div>
						</Nav.List>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</Nav.Root>
	</div>
</section>

{#snippet nestedLink({ nLink }: { nLink: INestedLink | undefined | null })}
	{#if nLink}
		<Nav.Item class="w-fit px-0 py-2">
			{#if nLink?.arr?.length == 1 && !nLink?.nest}
				<Nav.Link class="">
					{#snippet child()}
						<Button
							onclick={() => (open = false)}
							class={cn(
								'hover:text-primary/50 m-0 h-auto w-full border-0 p-2 text-center font-semibold whitespace-break-spaces shadow-none hover:bg-transparent max-md:focus-visible:ring-0 dark:hover:bg-transparent',
								activeLink == nLink && 'text-primary underline underline-offset-6'
							)}
							link={nLink?.arr?.[0]?.link}
						/>
					{/snippet}
				</Nav.Link>
			{:else}
				<!--  Trigger must come after because we need to use peer  -->
				<Nav.Trigger
					class="hover:bg-accent h-auto w-fit p-2 py-3 text-center whitespace-normal shadow-none focus-visible:focus:bg-transparent max-md:focus-visible:ring-0"
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
				<Nav.Content
					class="group-data-[viewport=false]/navigation-menu:shadow-none group-data-[viewport=false]/navigation-menu:ring-0"
				>
					<ul
						class="flex flex-col items-start justify-start gap-1 border-0 md:min-w-30 lg:min-w-40"
					>
						{#each nLink.arr ?? [] as { link }, i (i)}
							<Nav.Link>
								{#snippet child()}
									<Button
										onclick={() => (open = false)}
										class="h-auto border-0 py-2 shadow-none"
										{link}
									/>
								{/snippet}
							</Nav.Link>
						{/each}
					</ul>
				</Nav.Content>
			{/if}
		</Nav.Item>
	{/if}
{/snippet}
