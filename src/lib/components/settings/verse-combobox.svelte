<script lang="ts">
import Check from "lucide-svelte/icons/check";
import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
import * as Command from "$lib/components/ui/command";
import * as Popover from "$lib/components/ui/popover";
import { cn } from "$lib/utils.js";
import { tick } from "svelte";
import Button from "$lib/components/ui/button/button.svelte";
import { myData } from "$lib/nt_data";
import SettingsStore from "../../../stores/SettingsStore";
import type { DateValue } from "@internationalized/date";
import { get } from "svelte/store";
const importedData = myData;

let open = false;
let key = "";
$: selectedName = get(SettingsStore).name ?? "Select a verse...";

SettingsStore.subscribe((data) => {
  selectedName = data.name;
});

function closeAndFocusTrigger(triggerId: string) {
  open = false;
  tick().then(() => {
    document.getElementById(triggerId)?.focus();
  });
}

function updateSettingsVerse({ name, key }: { name: string; key: string }) {
  SettingsStore.update((currentValue) => {
    return { ...currentValue, name, key };
  });
}
</script>

<Popover.Root bind:open={open} let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedName}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search verse..." />
      <Command.Empty>No verse found.</Command.Empty>
      <Command.Group>
        {#each importedData as verse}
          <Command.Item
            value={verse.key}
            onSelect={(currentValue) => {
                  key = currentValue;
                  updateSettingsVerse(verse)
                  closeAndFocusTrigger(ids.trigger);
                }}
          >
            <Check
              class={cn(
                    "mr-2 h-4 w-4",
                    key !== verse.key && "text-transparent"
                  )}
            />
            {verse.name}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
