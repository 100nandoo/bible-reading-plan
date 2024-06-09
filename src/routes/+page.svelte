<script lang="ts">
import { myData } from "$lib/nt_data";
import { Checkbox } from "$lib/components/ui/checkbox";
import * as Card from "$lib/components/ui/card";
import Label from "$lib/components/ui/label/label.svelte";
import { onMount } from "svelte";
import { ArrowRight } from "lucide-svelte";
import Button from "$lib/components/ui/button/button.svelte";
import SettingsStore from "../stores/SettingsStore";
import { Confetti } from "$lib/components/home";
import Separator from "$lib/components/ui/separator/separator.svelte";
import DateDiffsLabel from "$lib/components/home/date-diffs-label.svelte";

let checked = false;
let todayString: string;
$: todayRead = $SettingsStore.index + 1;

$: biblegatewayUrl =
  "https://www.biblegateway.com/passage/?search=" + myData[todayRead].key + "&version=ESV";

function createTodayString() {
  const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  todayString = new Date().toLocaleDateString("en-SG", options);
}
onMount(() => {
  createTodayString();
});

$: {
  if (checked) {
    let index = $SettingsStore.index + 1;
    let name = myData[index].name;
    let key = myData[index].key;

    setTimeout(() => {
      // calculateLateness();
      checked = false;
      SettingsStore.update((currentValue) => {
        return { ...currentValue, index, name, key };
      });
    }, 500);
  }
}
</script>

<Card.Root class="w-120 md:max-w-full">
  <Card.Header>
    <Card.Title>{todayString}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex items-center space-x-4">
      <Checkbox id="terms" bind:checked={checked} />
      <Label
        for="terms"
        class="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >{myData[todayRead].name}</Label
      >
    </div>

    <div class="space-y-4">
      <p class="text-sm font-medium leading-none"></p>
      <Button on:click={() => window.open(biblegatewayUrl, '_blank')}>
        Open in biblegateway
        <ArrowRight />
      </Button>
    </div>

    <Separator class="my-4" />

    <DateDiffsLabel />
    <Confetti isTrigger={checked} />
  </Card.Content>
</Card.Root>
