<script lang="ts">
export let label = "";
</script>

<div class="flex items-center space-x-4">
  <p class="text-sm text-muted-foreground">{label}</p>
  <slot></slot>
</div>
