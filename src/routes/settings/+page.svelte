<script lang="ts">
import Check from "lucide-svelte/icons/check";
import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
import * as Command from "$lib/components/ui/command";
import * as Popover from "$lib/components/ui/popover";
import { cn } from "$lib/utils.js";
import { tick } from "svelte";
import Button from "$lib/components/ui/button/button.svelte";
import { myData } from "../nt_data";

const importedData = myData;

let open = false;
let value = "";

$: selectedKey = importedData.find((f) => f.key === value)?.name ?? "Select a framework...";

// We want to refocus the trigger button when the user selects
// an item from the list so users can continue navigating the
// rest of the form with the keyboard.
function closeAndFocusTrigger(triggerId: string) {
  open = false;
  tick().then(() => {
    document.getElementById(triggerId)?.focus();
  });
}
</script>

<div>
  <div class="flex items-center space-x-4">
    <p class="text-sm text-muted-foreground">Last read verses:</p>
    <Popover.Root bind:open={open} let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          class="w-[200px] justify-between"
        >
          {selectedKey}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-[200px] p-0">
        <Command.Root>
          <Command.Input placeholder="Search framework..." />
          <Command.Empty>No framework found.</Command.Empty>
          <Command.Group>
            {#each importedData as verse}
              <Command.Item
                value={verse.key}
                onSelect={(currentValue) => {
                    value = currentValue;
                    closeAndFocusTrigger(ids.trigger);
                  }}
              >
                <Check
                  class={cn(
                      "mr-2 h-4 w-4",
                      value !== verse.key && "text-transparent"
                    )}
                />
                {verse.name}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="flex items-center space-x-4">
    <p class="text-sm text-muted-foreground">Start Date:</p>
  </div>
</div>
