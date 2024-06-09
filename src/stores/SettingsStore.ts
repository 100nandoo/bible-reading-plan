import { persisted } from "svelte-persisted-store";

const KEY = "settingsStoreData";

export const SettingsStore = persisted(KEY, {
  index: 0,
  key: "Mt 1–2",
  name: "Matthew 1-2",
  date: "2024-05-01"
});

export type StoreData = {
  key: string;
  name: string;
  date: string;
};

export default SettingsStore;
