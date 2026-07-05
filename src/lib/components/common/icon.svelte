<script lang="ts">
	import type { IIcon } from '@payload-types';
	import 'iconify-icon';

	const {
		icon,
		size,
		name,
		class: className,
		style
	}: { icon?: IIcon; name?: string; size?: string; class?: string; style?: string } = $props();

	/*
	 *
	 * padding ->
	 *
	 */
</script>

<div
	style:margin={icon?.style?.margin}
	style:height={icon?.style?.height ?? 'inherit'}
	style:width={icon?.style?.width ?? 'inherit'}
	style:background={icon?.style?.background}
	style:border={icon?.style?.border}
	style:border-radius={icon?.style?.borderRadius}
	class="flex justify-center items-center"
>
	<iconify-icon
		class={className}
		height={icon?.size ?? size ?? 'none'}
		width={icon?.size ?? size ?? 'none'}
		style:height="auto"
		style:width="auto"
		icon={name ?? icon?.name ?? ''}
		style:color={icon?.style?.color}
		style={style ?? icon?.style?.string}
	>
	</iconify-icon>
</div>
