<script lang="ts">
import SettingsStore from "../../../stores/SettingsStore";
import { getLocalTimeZone, parseDate } from "@internationalized/date";

$: daysDiff = 0;
$: daysDiffWording = 0;
$: daysWording = "";
$: {
  const todayDate = new Date();
  const storeDate = parseDate($SettingsStore.date).toDate(getLocalTimeZone());
  const differenceMs = Math.abs(todayDate - storeDate);
  daysDiff = Math.ceil(differenceMs / (1000 * 60 * 60 * 24)) - ($SettingsStore.index + 1);
  daysWording = daysDiff > 0 ? "behind" : "ahead";
  daysDiffWording = Math.abs(daysDiff);
}
</script>

{#if daysDiff != 0}
  <h2>You are {daysDiffWording} days {daysWording}</h2>
{:else}
  <h2>You are on track!</h2>
{/if}
