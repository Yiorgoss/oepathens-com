<script lang="ts">
	import { onMount } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import CustomTheme from '@/components/common/custom-theme.svelte';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { site } from '@/config';
	import {
		subscribe as payloadSubscribe,
		unsubscribe as payloadUnsubscribe,
		ready
	} from '@payloadcms/live-preview';

	const { children }: LayoutProps = $props();

	onMount(() => {
		if (
			page.url.searchParams.get('livePreview') !== 'true' ||
			page.url.searchParams.get('collection') !== 'tenants' // will happen when tenants is not changed
		) {
			return;
		}
		ready({ serverURL: site.CMS });

		const payloadLivePreview = payloadSubscribe({
			callback: (doc) => {
				nav = doc.nav;
				themeColors = doc.themeColors;
			},
			depth: 1,
			initialData: page.data,
			serverURL: site.CMS
		});
		return () => payloadLivePreview && payloadUnsubscribe(payloadLivePreview);
	});

	let nav = $derived(page.data.nav);
	let themeColors = $derived(page.data.themeColors);
</script>

<div class="text-base">
	<CustomTheme {themeColors} />
	<header class="text-foreground relative">
		<RenderBlocks blockData={nav?.header?.[0]} />
	</header>
	<main class="text-foreground h-full w-full">
		{@render children()}
	</main>
	<footer class="text-foreground bg-background">
		<RenderBlocks blockData={nav?.footer?.[0]} />
	</footer>
</div>
