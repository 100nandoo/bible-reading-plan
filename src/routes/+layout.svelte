<script>
import Toolbar from "$lib/components/toolbar/toolbar.svelte";
import "../app.css";
export const prerender = true;
</script>

<header>
  <Toolbar />
</header>
<main>
  <div class="container mx-auto flex items-center justify-center">
    <slot></slot>
  </div>
</main>

<style></style>
