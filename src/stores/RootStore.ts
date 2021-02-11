import * as FileSystem from "expo-file-system";
import { Keyboard, Platform } from "react-native";
import { Entity } from "../models/v2/models";
import { AsyncPersistedVariable } from "../utils/async_var";
import { Observable } from "../utils/observable";
import { ApplicationStore } from "./ApplicationStore";

export const DATABASE_FILE = `db4.sqlite`;

setTimeout(() => {
  if (Platform.OS === "ios") {
    console.debug("With iOS simulator, open database with:");
    console.debug("----------------------------------------------------------------------------------------------------");
    console.debug(`sqlite3 ${decodeURIComponent((FileSystem.documentDirectory as string).replace("file://", ""))}SQLite/${DATABASE_FILE}`);
    console.debug("----------------------------------------------------------------------------------------------------");
    console.debug(`document directory ${decodeURIComponent((FileSystem.documentDirectory as string).replace("file://", ""))}`);
    console.debug("----------------------------------------------------------------------------------------------------");
    console.debug(`cache directory ${decodeURIComponent((FileSystem.cacheDirectory as string).replace("file://", ""))}`);
    console.debug("----------------------------------------------------------------------------------------------------");
  }
}, 5 * 1000);

export class RootStore {
  public ready = new Observable<boolean>(false);
  public keyboardHeight = new Observable<number>(0);

  public readonly app: ApplicationStore = new ApplicationStore(this);

  entities = new AsyncPersistedVariable("__aid_requests__", [] as Entity[]);
  dataImportedAt = new AsyncPersistedVariable("__data_reloaded__", 0);

  static API_BASE_URL = "https://relief-app-backend.herokuapp.com";

  constructor() {
    Keyboard.addListener("keyboardWillShow", (e) => {
      this.keyboardHeight.setIfChanged(e.endCoordinates.height);
    });
    Keyboard.addListener("keyboardDidShow", (e) => {
      this.keyboardHeight.setIfChanged(e.endCoordinates.height);
    });
    Keyboard.addListener("keyboardWillHide", (_e) => {
      this.keyboardHeight.setIfChanged(0);
    });
    Keyboard.addListener("keyboardDidHide", (_e) => {
      this.keyboardHeight.setIfChanged(0);
    });

    Promise.all([this.entities.loadAsync()]);

    this.ready.set(true);

    setImmediate(this.reloadDataAsync.bind(this));
  }

  sortAndFillType(e: Entity[]) {
    const backupDate = "2000-01-01T00:00:00.000Z";
    return (e || []).sort((e1, e2) => -(e1.created_at || backupDate).localeCompare(e2.created_at || backupDate));
  }

  async reloadDataAsync() {
    this.entities.set((this.sortAndFillType(await stores.apiGET("/data-api/all-entries?_limit=-1")) as Entity[]) || []);
    this.dataImportedAt.set(Date.now());
    console.debug(`imported ${this.entities.get().length} aid requests`);
  }

  public async apiGET(path: string) {
    const url = `${RootStore.API_BASE_URL}${path}`;
    const resp = await fetch(url);
    console.debug(`url=${url}, resp=${resp.status}`);
    if (resp.status === 200) {
      return JSON.parse(await resp.text());
    }
    throw new Error("Not found");
  }
}

export const stores = new RootStore();
