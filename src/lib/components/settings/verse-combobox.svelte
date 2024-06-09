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
const importedData = myData;

let open = false;

function closeAndFocusTrigger(triggerId: string) {
  open = false;
  tick().then(() => {
    document.getElementById(triggerId)?.focus();
  });
}

function updateSettingsVerse({ name, key }: { name: string; key: string }, index: number) {
  SettingsStore.update((currentValue) => {
    return { ...currentValue, index, name, key };
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
      class="w-auto justify-between font-normal"
    >
      {$SettingsStore.name}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Command.Root>
      <Command.Input placeholder="Search verse..." />
      <Command.Empty>No verse found.</Command.Empty>
      <Command.Group>
        {#each importedData as verse, i}
          <Command.Item
            value={verse.key}
            onSelect={(currentValue) => {
                  $SettingsStore.key = currentValue;
                  updateSettingsVerse(verse, i)
                  closeAndFocusTrigger(ids.trigger);
                }}
          >
            <Check
              class={cn(
                    "mr-2 h-4 w-4",
                    $SettingsStore.key !== verse.key && "text-transparent"
                  )}
            />
            {verse.name}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
