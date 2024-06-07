<script lang="ts">
import CalendarIcon from "lucide-svelte/icons/calendar";
import {
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
  CalendarDate
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

let dateValue: CalendarDate | undefined;
let dateFormatted = df.format(get(SettingsStore).date.toDate(getLocalTimeZone()));

function handleDateChange(date: DateValue | undefined) {
  SettingsStore.update((currentValue) => ({ ...currentValue, date }));
}
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
          " ustify-start text-left font-normal",
          !dateFormatted && "text-muted-foreground"
        )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {dateFormatted ?? "Select a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value={dateValue} onValueChange={handleDateChange} initialFocus />
  </Popover.Content>
</Popover.Root>
