<script lang="ts">
	import { page } from '$app/state';
</script>

<h1 class="flex flex-col h-svh w-full items-center justify-center">
	<span>{page.status}</span>
	<span>{page?.error?.message ?? 'Error Loading Page'}</span>
</h1>
