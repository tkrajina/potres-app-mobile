import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from "expo-file-system";
import { Keyboard, Platform } from "react-native";
import { Accommodations as Accommodation } from "../models/Accommodations";
import { AidCollection } from "../models/AidCollection";
import { AidRequest } from "../models/AidRequest";
import { Entity } from "../models/entities";
import { EntityType } from "../screens/common";
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

  aidRequests = new AsyncPersistedVariable("__aid_requests__", [] as AidRequest[]);
  accomodations = new AsyncPersistedVariable("__accomodations__", [] as Accommodation[]);
  aidCollections = new AsyncPersistedVariable("__aid_collections__", [] as AidCollection[]);
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

    Promise.all([this.aidRequests.loadAsync(), this.accomodations.loadAsync(), this.aidCollections.loadAsync(), this.dataImportedAt.loadAsync()]);

    this.ready.set(true);

    setImmediate(this.reloadDataAsync.bind(this));
  }

  sortAndFillType(type: EntityType, e: Entity[]) {
    const backupDate = "2000-01-01T00:00:00.000Z";
    e.map((i) => (i.type = type));
    return (e || []).sort((e1, e2) => -(e1.created_at || backupDate).localeCompare(e2.created_at || backupDate));
  }

  async reloadDataAsync() {
    this.aidRequests.set((this.sortAndFillType(EntityType.AID_REQUEST, await stores.apiGET("/aid-requests?_limit=-1")) as AidRequest[]) || []);
    this.accomodations.set((this.sortAndFillType(EntityType.ACCOMODATIONS, await stores.apiGET("/accommodations?_limit=-1")) as Accommodation[]) || []);
    this.aidCollections.set((this.sortAndFillType(EntityType.AID_COLLECTION, await stores.apiGET("/aid-collections?_limit=-1")) as AidCollection[]) || []);
    this.dataImportedAt.set(Date.now());
    console.debug(`imported ${this.aidRequests.get().length} aid requests`);
    console.debug(`imported ${this.accomodations.get().length} accomodations`);
    console.debug(`imported ${this.aidCollections.get().length} aid collections`);
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
