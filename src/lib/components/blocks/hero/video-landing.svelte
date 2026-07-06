<script lang="ts">
	import type { IVideoLanding } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { onMount } from 'svelte';

	const { blockData, cb }: { blockData: IVideoLanding; cb?: () => void } = $props();

	onMount(() => cb && cb());
</script>

<section id="VideoLanding">
	<div
		style:background={blockData.style?.background}
		class="h-full w-full pt-(--header-height) md:pt-0 flex flex-col justify-center items-center"
	>
		<div class="w-full" aria-hidden="true">
			{#if blockData.video?.url}
				<video
					muted
					autoplay
					controls={false}
					disablepictureinpicture
					loop
					height="100%"
					width="100%"
				>
					<source src={blockData.video?.url} type="video/mp4" />
				</video>
			{/if}
		</div>
		<div class="flex justify-center items-center">
			<RichTextRender richText={blockData.richText} />
		</div>
	</div>
</section>
