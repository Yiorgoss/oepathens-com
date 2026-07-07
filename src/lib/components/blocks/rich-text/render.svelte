<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn, getRestPopulateFn } from '@/utils';
	import { htmlConverters } from './converters';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import { site } from '@/config';
	import { page } from '$app/state';

	import Icon from '@/components/common/icon.svelte';
	import { onMount, untrack } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();

	let html = $state('');

	$effect(() => {
		if (!richText || !richText.text) return;
		convertLexicalToHTMLAsync({
			data: richText.text,
			converters: htmlConverters,
			//@ts-ignore
			populate: getRestPopulateFn({
				apiURL: `${site.CMS}/api`,
				locale: page.params.locale ?? 'en'
			})
		}).then((data) => (html = data));
	});

	const defaults = 'container my-auto wrap-break-word w-full max-w-full ';
	const mobile = new MediaQuery('max-width: 768px');
</script>

{#if richText && richText.text}
	<!--  when switching languages richText becomes undefined  -->
	<div
		style:max-width={richText.style?.maxWidth}
		style:--list-marker-color={richText.style?.marker}
		style:text-align={mobile.current && richText?.mobileStyle?.textAlign}
		class=""
	>
		<!--  {#if richText.animation.type}
			{#await import('./animated.svelte') then B: any}
				{@const Block = B.default}
				<Block
					overrides={cn(defaults, overrides)}
					style={richText.style}
					animation={richText.animation}
					html={html ?? ''}
				/>
			{/await}
		{:else}  -->
		<DefaultRichText overrides={cn(defaults, overrides)} style={richText.style} html={html ?? ''} />
		<!--  {/if}  -->
	</div>
{/if}
<!--  {/key}  -->
