<script lang="ts">
	const { themeColors }: { themeColors?: string | null } = $props();
</script>

{#if themeColors}
	<svelte:element this={'style'}>{`:root { ${themeColors} }`}</svelte:element>
{/if}
