<script lang="ts">
	import { cn } from '@/utils';

	const { name, data, class: className }: { name: string; data?: any; class?: string } = $props();

	const getSVG = async (svgName: string | undefined) => {
		if (!svgName) return;
		switch (svgName) {
			case 'cutout-main':
				return import('./cutout-main.svelte');
			case 'cutout-small':
				return import('./cutout-small.svelte');
			case 'clip-path':
				return import('./clip-path.svelte');
			case 'wavy-text':
				return import('./wavy-text.svelte');
		}
	};
	//@ts-ignore
	let SVGElement = $derived(await getSVG(name).then((block) => block.default));
</script>

{#if SVGElement}
	<SVGElement {data} />
{/if}
