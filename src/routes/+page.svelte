<script lang="ts">
import { myData } from "./nt_data";
import { Checkbox } from "$lib/components/ui/checkbox";
import * as Card from "$lib/components/ui/card";
import Label from "$lib/components/ui/label/label.svelte";
import { onMount } from "svelte";
import { ArrowRight } from "lucide-svelte";
import Button from "$lib/components/ui/button/button.svelte";

const importedData = myData;
let checked = false;
let index = 10;

let today: string;
let biblegatewayUrl: string =
  "https://www.biblegateway.com/passage/?search=" + importedData[index].key + "&version=ESV";

onMount(() => {
  const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  today = new Date().toLocaleDateString("en-SG", options);
});
</script>

<Card.Root class="w-120 md:max-w-full">
  <Card.Header>
    <Card.Title>{today}</Card.Title>
  </Card.Header>
  <Card.Content>
    <Checkbox id="terms" bind:checked={checked} />
    <Label
      for="terms"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    ></Label>
    <div class="space-y-1">
      <p class="text-sm font-medium leading-none">{importedData[index].name}</p>
      <p class="font-large text-xl">Your todays read</p>
      <Button on:click={() => window.open(biblegatewayUrl, '_blank')}>
        Open in biblegateway
        <ArrowRight />
      </Button>
    </div>
  </Card.Content>
</Card.Root>
