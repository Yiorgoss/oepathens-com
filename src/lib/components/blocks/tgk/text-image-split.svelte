<script lang="ts">
	import type { ITextImageSplit } from '@payload-types';
	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '../rich-text';
	const { blockData }: { blockData: ITGKTextImageSplit } = $props();
</script>

<section id="TextImageSplit">
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="">
			<Image image={blockData.imgLeft} class="" />
		</div>
		<div class:-order-1={blockData?.left} class="order-1 grid grid-col-1 grid-row-1">
			<RichTextRender richText={blockData.richText} />
			<Image image={blockData.imgRight} class="col-start-1 row-start-1" />
		</div>
	</div>
</section>
