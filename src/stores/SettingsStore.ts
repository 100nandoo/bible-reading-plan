import { type DateValue, parseDate } from "@internationalized/date";
import { persisted } from "svelte-persisted-store";

const KEY = "settingsStoreData";

export const SettingsStore = persisted(KEY, {
  key: "Mt 1–2",
  name: "Matthew 1-2",
  date: parseDate("2024-05-01")
});

export type StoreData = {
  key: string;
  name: string;
  date: DateValue;
};

export default SettingsStore;
