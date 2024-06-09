<script lang="ts">
export let label = "";
</script>

<div class="mt-4 flex items-center justify-between space-x-4">
  <p class="text-sm text-muted-foreground">{label}</p>
  <slot></slot>
</div>
