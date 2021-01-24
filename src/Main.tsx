import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Center } from "./components/Center";
import { BASELINE_INFO_24PX, BASELINE_SEARCH_24PX, MAP_24PX } from "./images_generated";
import { Routes, Stacks } from "./routes";
import InfoScreen from "./screens/InfoScreen";
import MapScreen from "./screens/MapScreen";
import SearchScreen from "./screens/SearchScreen";
import { stores } from "./stores/RootStore";
import { CleanupContainer } from "./utils/cleanup";
import * as Errors from "./utils/errors";

Errors.initGlobalErrorHandler(console.error);

class AppState {
  ready = stores.ready;
}

class Main extends React.Component<any, AppState> {
  cleanup = new CleanupContainer();

  constructor(props: any) {
    super(props);
    this.state = new AppState();
  }

  async componentDidMount() {
    this.cleanup.triggerObservableStateChanges("app", this);
    this.onAppStarted();
  }

  private onAppStarted() {}

  async componentWillUnmount() {
    this.cleanup.cleanup();
  }

  render() {
    if (!this.state.ready.get()) {
      return (
        <SafeAreaView style={{ marginTop: 100 }}>
          <Center>
            <Text>loading...</Text>
          </Center>
        </SafeAreaView>
      );
    }

    return (
      <NavigationContainer>
        <MainStackNavigator.Navigator headerMode="none">
          <MainStackNavigator.Screen name="root" component={BottomTabs} initialParams={{}} />
        </MainStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

const MainStackNavigator = createStackNavigator();

const BottomTabNavigator = createBottomTabNavigator();

function BottomTabs(props: {}) {
  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        inactiveTintColor: "#bbb",
        activeTintColor: "black",
        keyboardHidesTabBar: true,
        tabStyle: { paddingTop: 5, paddingBottom: 5 },
      }}
    >
      <BottomTabNavigator.Screen
        name={Stacks.MAP}
        component={MapStack}
        options={{
          tabBarLabel: "Karta",
          tabBarIcon: ({ focused, color, size }) => <Image style={{ alignSelf: "center", opacity: focused ? 1 : 0.3 }} source={MAP_24PX} />,
        }}
      />
      <BottomTabNavigator.Screen
        name={Stacks.SEARCH}
        component={SearchStack}
        options={{
          tabBarLabel: "Pretraživanje",
          tabBarIcon: ({ focused, color, size }) => <Image style={{ alignSelf: "center", opacity: focused ? 1 : 0.3 }} source={BASELINE_SEARCH_24PX} />,
        }}
      />
      <BottomTabNavigator.Screen
        name={Stacks.INFO}
        component={InfoStack}
        options={{
          tabBarLabel: "Info",
          tabBarIcon: ({ focused, color, size }) => <Image style={{ alignSelf: "center", opacity: focused ? 1 : 0.3 }} source={BASELINE_INFO_24PX} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const MapStackNavigator = createStackNavigator();
function MapStack(props: {}) {
  return (
    <MapStackNavigator.Navigator headerMode="none">
      <MapStackNavigator.Screen name={Routes.MAP} component={MapScreen} />
    </MapStackNavigator.Navigator>
  );
}

const SearchStackNavigator = createStackNavigator();
function SearchStack(props: {}) {
  return (
    <SearchStackNavigator.Navigator headerMode="none">
      <SearchStackNavigator.Screen name={Routes.SEARCH} component={SearchScreen} />
    </SearchStackNavigator.Navigator>
  );
}

const InfoStackNavigator = createStackNavigator();
function InfoStack(props: {}) {
  return (
    <InfoStackNavigator.Navigator headerMode="none">
      <InfoStackNavigator.Screen name={Routes.INFO} component={InfoScreen} />
    </InfoStackNavigator.Navigator>
  );
}

export default Main;
