<script lang="ts">
	import { supportedLocales, type SupportedLocalesKeys, defaultLocale } from '@/config';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { page } from '$app/state';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '@/components/ui/button';
	import Spinner from './spinner.svelte';
	import Flag from './flag.svelte';

	const { useFlag = false }: { useFlag?: boolean } = $props();
	const { locale, slug } = $derived(page.params);
	let disabled = $state(false);

	let currentLang = $derived(supportedLocales[locale ?? ''] ?? supportedLocales[defaultLocale]);

	$effect(() => {
		document.documentElement.lang = locale ?? defaultLocale;
	});
</script>

{#key locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger aria-label="language menu" class="">
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					class="font-light py-2 px-2 text-xs flex justify-center gap-2 items-center"
					{disabled}
				>
					{@render flagOrLocale({ locale })}
					{#if disabled}
						<Spinner class="size-4" />
					{:else}
						<ChevronDownIcon class="font-thin stroke-1 size-4" />
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="rounded-[10px] py-2 px-2 ">
			<DropdownMenu.RadioGroup bind:value={currentLang}>
				{#each Object.entries(supportedLocales) as [key, value], i}
					<DropdownMenu.Item class="rounded-xxs">
						<Button
							onclick={async (e) => {
								disabled = true;
								setTimeout(() => {
									disabled = false;
								}, 1000);
							}}
							class="w-full"
							href={`/${key}/${slug}`}
							variant="ghost"
							lang={key}
							hreflang={key}
						>
							{@render flagOrLocale({ locale: key, text: value })}
						</Button>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/key}

{#snippet flagOrLocale({ locale, text }: { locale?: SupportedLocalesKeys; text?: String })}
	{#if useFlag}
		<Flag flag={locale} />
	{:else}
		<span class="">{text}</span>
	{/if}
{/snippet}
