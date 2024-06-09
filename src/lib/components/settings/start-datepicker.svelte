<script lang="ts">
import CalendarIcon from "lucide-svelte/icons/calendar";
import {
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
  parseDate
} from "@internationalized/date";
import { cn } from "$lib/utils.js";
import { Button } from "$lib/components/ui/button";
import { Calendar } from "$lib/components/ui/calendar";
import * as Popover from "$lib/components/ui/popover";
import SettingsStore from "../../../stores/SettingsStore";
import { get } from "svelte/store";

const df = new DateFormatter("en-SG", {
  dateStyle: "long"
});

let value: DateValue;

async function getDate(): Promise<DateValue> {
  const date = await get(SettingsStore).date;
  return parseDate(date);
}

let promise = getDate();

function handleDateChange(date: DateValue) {
  SettingsStore.update((currentValue) => ({ ...currentValue, date: date.toString() }));
}
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "w-auto text-left font-normal"
      )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {#if value}
        {df.format(value.toDate(getLocalTimeZone()))}
      {:else}
        {#await promise}
          <p>...waiting</p>
        {:then data}
          {df.format(data.toDate(getLocalTimeZone()))}
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}
      {/if}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value={value} onValueChange={handleDateChange} initialFocus />
  </Popover.Content>
</Popover.Root>
