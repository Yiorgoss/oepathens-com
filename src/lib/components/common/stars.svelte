<script lang="ts">
	import Icon from '@/components/common/icon.svelte';
</script>

<div class="flex py-2 ">
	{#each { length: 5 }}
		<Icon size="14px" name="bi:star-fill" />
	{/each}
</div>
