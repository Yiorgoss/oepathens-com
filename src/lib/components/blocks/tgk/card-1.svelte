<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '@/utils';
	import type { ITGKCard1 } from '@payload-types';
	import { MediaQuery } from 'svelte/reactivity';

	const { blockData }: { blockData: ITGKCard1 } = $props();

	const mobile = new MediaQuery('max-width: 768px');
	const { locale } = $derived(page.params);

	let href = $derived.by(() => {
		const { urlType, url, reference } = blockData;
		// custom url
		if (urlType == 'custom' && url) return url;
		// internal url
		if (urlType == 'reference' && reference) {
			//@ts-ignore
			const slug = reference.value.slug; //slug is present if depth > 0 because of defaultPopulate
			return locale ? `/${locale}/${slug}` : `/${slug}`;
		}

		return null;
	});
</script>

<section id="TGKCard1" class="w-fit">
	<a {href} aria-disabled={!href}>
		<div
			class={cn(
				'hover:bg-(--tgk-card-color) transition-colors duration-200 group/tgk-card overflow-hidden border-4 rounded-tr-4xl rounded-bl-4xl',
				blockData.left && 'rounded-none rounded-tl-4xl rounded-br-4xl'
			)}
			style:--tgk-card-color={blockData.style.background}
			style:--tgk-text-color={blockData.style.color}
			style:border-color="var(--tgk-card-color)"
			style:height={mobile.current
				? (blockData.mobileStyles?.height ?? blockData.style?.height)
				: blockData.style.height}
			style:width={mobile.current
				? (blockData.mobileStyles?.width ?? blockData.style?.width)
				: blockData.style.width}
		>
			<div class="flex justify-center w-full items-end h-full">
				<div
					class="text-2xl md:text-xl duration-100 font-serif group-hover/tgk-card:text-(--tgk-text-color) text-(--tgk-card-color) font-medium w-full px-4 py-10"
				>
					{blockData.title}
				</div>
			</div>
		</div>
	</a>
</section>
