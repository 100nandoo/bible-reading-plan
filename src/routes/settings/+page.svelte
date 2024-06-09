<script lang="ts">
import { type DateValue, DateFormatter, getLocalTimeZone } from "@internationalized/date";
import VerseCombobox from "$lib/components/settings/verse-combobox.svelte";
import SettingsLabel from "$lib/components/settings/settings-label.svelte";
import StartDatepicker from "$lib/components/settings/start-datepicker.svelte";

const df = new DateFormatter("en-SG", {
  dateStyle: "long"
});
</script>

<div>
  <SettingsLabel label="Last read verses:">
    <VerseCombobox></VerseCombobox>
  </SettingsLabel>
  <SettingsLabel label="Start Date:">
    <StartDatepicker></StartDatepicker>
  </SettingsLabel>
</div>
