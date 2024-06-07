<script lang="ts">
import { Settings, Home } from "lucide-svelte";
import { base } from "$app/paths";
</script>

<div>
  <div class="flex w-full items-center justify-center">
    <a href="{base}/" class="p-4"><Home /></a>
    <a href="{base}/settings"><Settings /></a>
  </div>
</div>
