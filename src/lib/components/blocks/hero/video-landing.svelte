<script lang="ts">
	import type { IVideoLanding } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { onMount } from 'svelte';

	const { blockData, cb }: { blockData: IVideoLanding; cb?: () => void } = $props();

	onMount(() => cb && cb());
</script>

<section id="VideoLanding" class="">
	<div
		style:background={blockData.style?.background}
		class="h-full w-full grid grid-cols-1 grid-rows-1"
	>
		<div class="row-start-1 col-start-1" aria-hidden="true">
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
		<div class="flex justify-center items-center row-start-1 col-start-1">
			<RichTextRender richText={blockData.richText} />
		</div>
	</div>
</section>
