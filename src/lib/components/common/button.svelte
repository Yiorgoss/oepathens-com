<script lang="ts">
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import { type IButton, type Page } from '@payload-types';
	import { ButtonPrimitive } from '@/components/common/primitives';
	import { Button, type ButtonProps as DefaultButtonProps } from '@/components/ui/button';
	import { page } from '$app/state';
	import Icon from './icon.svelte';

	type ButtonProps = { link?: IButton } & DefaultButtonProps;
	let {
		class: className,
		variant: _variant = 'default',
		size = 'default',
		ref = $bindable(null),
		type = 'button',
		link,
		children,
		...restProps
	}: ButtonProps = $props();

	const { locale } = $derived(page.params);
	let { type: urlType, reference, url, display, style } = $derived(link || {});

	let _href = $state<Partial<Page> | undefined | null>(undefined);
	let variant = $derived(display?.variant ?? _variant);

	let href = $derived.by(() => {
		// hardcoded
		if (restProps['href']) return restProps['href'];
		// must be IButton
		// custom url
		if (urlType == 'custom' && url) return url;
		// internal url
		if (urlType == 'reference' && reference) {
			//@ts-ignore
			const slug = reference.value.slug; //slug is present if depth > 0 because of defaultPopulate
			return locale ? `/${locale}/${slug}` : `/${slug}`;
		}
		// _href has not resolved or resolved undefined
		if (!_href && typeof _href == 'string') return 'javascript:void(0);';

		return '##';
	});
</script>

<Button
	style={`padding=${style?.padding};`}
	class={cn('wrap-anywhere mx-2', className)}
	{variant}
	{size}
	{href}
	{...restProps}
>
	{#if display?.text || display?.includeIcon}
		<div class="flex gap-2">
			<p class="">
				{display.text}
			</p>
			{#if display.includeIcon}
				<Icon icon={display.icon} />
			{/if}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</Button>
