<script lang="ts">
import { type DateValue, DateFormatter, getLocalTimeZone } from "@internationalized/date";
import VerseCombobox from "$lib/components/settings/verse-combobox.svelte";
import SettingsLabel from "$lib/components/settings/settings-label.svelte";
import StartDatepicker from "$lib/components/settings/start-datepicker.svelte";
import SettingsStore from "../../stores/SettingsStore";
import { get } from "svelte/store";

const df = new DateFormatter("en-SG", {
  dateStyle: "long"
});

SettingsStore.subscribe((s) => console.log(JSON.parse(JSON.stringify(s))));
</script>

<div>
  <SettingsLabel label="Last read verses:">
    <VerseCombobox></VerseCombobox>
  </SettingsLabel>
  <SettingsLabel label="Start Date:">
    <!-- <StartDatepicker></StartDatepicker> -->
    <!-- {selectedDateValue ? df.format(selectedDateValue.toDate(getLocalTimeZone())) : "Select a date"} -->
  </SettingsLabel>
</div>
