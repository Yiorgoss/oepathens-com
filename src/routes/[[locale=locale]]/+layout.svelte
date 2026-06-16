<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, untrack, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData, LayoutProps } from './$types';
	import { type INavigation, type Page, type Tenant } from '@payload-types';
	import { page } from '$app/state';
	import { site } from '@/config';
	import {
		subscribe as payloadSubscribe,
		unsubscribe as payloadUnsubscribe,
		ready
	} from '@payloadcms/live-preview';
	import DialogClose from '@/components/ui/dialog/dialog-close.svelte';

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
			},
			depth: 1,
			initialData: page.data,
			serverURL: site.CMS
		});
		return () => payloadLivePreview && payloadUnsubscribe(payloadLivePreview);
	});

	let nav = $derived(page.data.nav);
</script>

<div class="text-base scrollbar-gutter-stable">
	<header class="text-foreground bg-background">
		<RenderBlocks blockData={nav?.header?.[0]} />
	</header>
	<main class="text-foreground bg-background h-full w-full">
		{@render children()}
	</main>
	<footer class="text-foreground bg-background">
		<RenderBlocks blockData={nav?.footer?.[0]} />
	</footer>
</div>
