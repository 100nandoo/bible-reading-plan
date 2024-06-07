<script>
import "../app.css";
import { Settings } from "lucide-svelte";
</script>

<header>
  Toolbar
  <a href="/settings"><Settings /></a>
</header>
<main>
  <div class="container mx-auto flex items-center justify-center">
    <slot></slot>
  </div>
</main>

<style></style>
