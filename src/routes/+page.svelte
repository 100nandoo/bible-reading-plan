<script lang="ts">
import { myData } from "$lib/nt_data";
import { get } from "svelte/store";
import { Checkbox } from "$lib/components/ui/checkbox";
import * as Card from "$lib/components/ui/card";
import Label from "$lib/components/ui/label/label.svelte";
import { onMount } from "svelte";
import { ArrowRight } from "lucide-svelte";
import Button from "$lib/components/ui/button/button.svelte";
import SettingsStore from "../stores/SettingsStore";

let checked = false;
let today: string;
let biblegatewayUrl: string =
  "https://www.biblegateway.com/passage/?search=" + $SettingsStore.key + "&version=ESV";

onMount(() => {
  const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  today = new Date().toLocaleDateString("en-SG", options);
});

const handleCheckedChange = (isChecked) => {
  if (isChecked) {
    let index = $SettingsStore.index + 1;
    let name = myData[index].name;
    let key = myData[index].key;
    setTimeout(() => {
      checked = false;
      SettingsStore.update((currentValue) => {
        return { ...currentValue, index, name, key };
      });
    }, 500);
  }
};
</script>

<Card.Root class="w-120 md:max-w-full">
  <Card.Header>
    <Card.Title>{today}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex items-center space-x-4">
      <Checkbox id="terms" bind:checked={checked} onCheckedChange={handleCheckedChange} />
      <Label
        for="terms"
        class="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >{$SettingsStore.name}</Label
      >
    </div>

    <div class="space-y-4">
      <p class="text-sm font-medium leading-none"></p>
      <Button on:click={() => window.open(biblegatewayUrl, '_blank')}>
        Open in biblegateway
        <ArrowRight />
      </Button>
    </div>
  </Card.Content>
</Card.Root>
