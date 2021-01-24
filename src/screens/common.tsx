import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationRoute } from "react-navigation";
import { RootStore } from "../stores/RootStore";

export interface ScreenProps {
  stores?: RootStore;
  navigation: StackNavigationProp<any, any>;
  route: NavigationRoute;
}

export enum EntityType {
  ACCOMODATIONS = "Smještaji / Usluge",
  AID_COLLECTION = "Prikupi donacija",
  AID_REQUEST = "Tražim pomoć"
}
