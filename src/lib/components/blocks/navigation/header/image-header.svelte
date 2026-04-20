<script lang="ts">
	import { NavigationMenu as Nav } from 'bits-ui';
	import Image from '@/components/common/image.svelte';
	import Button from '@/components/common/button.svelte';
	import * as Sheet from '@/components/ui/sheet';
	import { type IImageHeader } from '@payload-types';
	import { onMount } from 'svelte';
	import { cn } from '@/utils';
	import { page } from '$app/state';
	import LocaleSwitcher from '@/components/common/locale-switcher.svelte';
	import { supportedLocales } from '@/config';
	import Icon from '@/components/common/icon.svelte';

	const { blockData }: { blockData: IImageHeader } = $props();

	const { image, nav } = $derived(blockData);
	const { locale } = $derived(page.params);

	let open = $state(false);

	let mounted = $state(false);

	onMount(() => (mounted = true));
</script>

<section
	class="absolute top-0 inset-x-0 overflow-hidden z-30 mx-auto h-(--header-height) px-0 md:px-0"
>
	<div class="w-full h-full pr-0 container">
		<!-- desktop -->
		<Nav.Root
			class={cn(
				'hidden px-10 bg-background w-screen items-center justify-between md:flex',
				blockData.style?.hasShadow && 'shadow-xl'
			)}
		>
			<a href={`/${locale ?? ''}`} aria-label="home page" class="">
				<div class="h-(--header-height) lg:p-2 md:p-4 w-auto">
					<Image
						class="object-contain py-2"
						loading="eager"
						fetchpriority="high"
						sizes="500px"
						{image}
					/>
				</div>
			</a>
			<Nav.List class="flex items-center justify-center pr-10 ">
				{#if Object.entries(supportedLocales).length > 0}
					<Nav.Item class="px-2">
						<LocaleSwitcher />
					</Nav.Item>
				{/if}
				{#each nav ?? [] as { link }}
					<Nav.Item class="px-2">
						<Nav.Link>
							{#snippet child()}
								<Button variant="ghost" class="font-serif h-full text-lg font-semibold " {link} />
							{/snippet}
						</Nav.Link>
					</Nav.Item>
				{/each}
			</Nav.List>
		</Nav.Root>
		<!-- mobile -->
		<div class="flex h-full items-center justify-end md:hidden">
			<Sheet.Root bind:open>
				<div class={cn('bg-background shadow-xl flex justify-between items-center h-full w-full ')}>
					<a href={`/${locale ?? ''}`} aria-label="home page" class="">
						<div class="h-(--header-height) p-2 lg:p-2 md:p-4">
							<!--  max width needed on picture to prevent wierd img grow on safari  -->
							<Image class="object-contain max-h-(--header-height)" loading="eager" {image} />
						</div>
					</a>
					<Sheet.Trigger class="h-full">
						<div
							aria-label="navigation menu "
							class="focus-visible:ring-offset-background size-8 justify-center items-center flex mr-4 p-2 focus-visible:outline-hidden"
						>
							<Icon name="lucide:menu" class="size-8" />
						</div>
					</Sheet.Trigger>
				</div>
				<Sheet.Content>
					<Sheet.Header>
						<Nav.Root class="h-full [&>div]:h-full ">
							<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
							<Nav.List class="flex h-full w-full flex-col items-start justify-center ">
								{#each nav ?? [] as { link }}
									<Nav.Item class="w-full py-4">
										<Nav.Link class="">
											{#snippet child()}
												<Button
													onclick={() => (open = false)}
													variant="ghost"
													class="font-serif text-primary w-full py-10 text-xl font-semibold hover:bg-black/20"
													{link}
												/>
											{/snippet}
										</Nav.Link>
									</Nav.Item>
								{/each}
								<Nav.Item class="w-full py-4 flex justify-center items-center">
									<LocaleSwitcher />
								</Nav.Item>
							</Nav.List>
						</Nav.Root>
					</Sheet.Header>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</section>
