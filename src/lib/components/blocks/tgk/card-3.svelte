<script lang="ts">
	import type { ITGKCard3 } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Image from '@/components/common/image.svelte';
	import { page } from '$app/state';

	const { blockData }: { blockData: ITGKCard3 } = $props();
	const { locale } = $derived(page.params);

	let href = $derived.by(() => {
		const { urlType, url, reference } = blockData || {};
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

<section id="TGKCard3" class="">
	<a {href} aria-disabled={!href}>
		<div
			style:background={blockData.style?.background}
			style:padding={blockData.style?.padding}
			style:border={blockData.style?.border}
			style:border-radius={blockData.style?.borderRadius}
			class="hover:scale-105 h-full transition-transform duration-300"
		>
			<div class="grid grid-cols-1 items-center">
				<div class="relative row-span-1 h-full w-full">
					<Image class="h-full w-full " image={blockData.image} />
					<div
						class="absolute bottom-0 right-0 left-0 translate-y-1/2 flex justify-center items-center"
					>
						<div
							style:background={blockData.midStyle?.background}
							style:border={blockData.midStyle?.border}
							style:height={blockData.midStyle?.width}
							style:width={blockData.midStyle?.width}
							class="bg-background flex justify-center items-center border-3 rounded-full h-20 w-20"
						>
							<RichTextRender overrides="text-center" richText={blockData.middleText} />
						</div>
					</div>
				</div>
				<div
					style:padding-top={blockData.midStyle?.width && `calc(${blockData.midstyle?.width}/2)px`}
					class="row-span-1 flex justify-center items-start relative h-auto pt-10"
				>
					<div class="">
						<RichTextRender richText={blockData.richText} />
					</div>
				</div>
			</div>
		</div>
	</a>
</section>
