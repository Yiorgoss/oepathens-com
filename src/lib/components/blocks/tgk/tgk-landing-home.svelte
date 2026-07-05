<script lang="ts">
	import { onMount } from 'svelte';
	import type { ITGKLandingHome } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '../rich-text';

	const { blockData, cb }: { blockData: ITGKLandingHome; cb: () => void } = $props();
	onMount(() => cb && cb());
</script>

<section id="LandingTGK">
	<div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 h-svh overflow-hidden">
		<div class="">
			<Image image={blockData.imgLeft} class="" />
		</div>
		<div class="grid grid-cols-1 h-full w-full grid-rows-1">
			<div class="col-start-1 row-start-1 h-full w-full">
				<Image image={blockData.imgRight} class="object-left h-full" />
			</div>
			<div class="col-start-1 row-start-1 h-full w-full flex justify-center items-center p-10">
				<RichTextRender overrides="" richText={blockData.richText} />
			</div>
		</div>
	</div>
</section>
