import { StackNavigationProp } from "@react-navigation/stack";
import { default as React } from "react";
import { Image, Platform, StatusBar, StyleSheet, Text, View, ViewStyle, SafeAreaView } from "react-native";
import { Routes } from "../routes";
import { stores } from "../stores/RootStore";
import { CleanupContainer } from "../utils/cleanup";
import * as Utils from "../utils/utils";
import { ErrorBoundary } from "./ErrorBoundary";

interface AppScreenViewProps {
  title: string;
  withDefaultPadding?: boolean;
  navigation: StackNavigationProp<any, any>;
}
class AppScreenViewState {
  keyboardHeight = stores.keyboardHeight;
}

export class AppScreenView extends React.Component<AppScreenViewProps, AppScreenViewState> {
  cleanup = new CleanupContainer();

  constructor(props: AppScreenViewProps) {
    super(props);
    this.state = new AppScreenViewState();

    Utils.bindAllPrefixedMethods(this);

    this.props.navigation.addListener("focus", this.willFocus.bind(this));
    this.props.navigation.addListener("blur", this.didBlur.bind(this));
  }

  willFocus() {
    this.cleanup.triggerObservableStateChanges("app screen", this);
  }

  didBlur() {
    this.cleanup.cleanup();
  }

  componentDidMount() {
    if (!this.props.navigation) {
      console.error("navigation not set");
    }
  }

  callbackOnBack() {
    this.props.navigation.goBack();
  }

  callbackOnNavigation(route: Routes) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <SafeAreaView
        style={[
          styles.safeAreaView,
          {
            backgroundColor: "#b9cffb",
            paddingBottom: Platform.OS === "ios" ? this.state.keyboardHeight.get() : 0,
          },
        ]}
      >
        <View
          style={{
            height: StatusBar.currentHeight ? StatusBar.currentHeight : undefined,
          }}
        />
        <View
          style={[
            {
              height: 50,
              paddingHorizontal: 10,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#999",
              backgroundColor: "#b9cffb",
            },
          ]}
        >
          <Image source={require("../../assets/in_app_icon.png")} style={{ width: 45, height: 45 }} />
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              alignSelf: "flex-start",
              fontSize: 20,
              color: "#333",
              fontStyle: "italic",
            }}
          >
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: this.props.withDefaultPadding ? 10 : undefined,
            backgroundColor: "white",
          }}
        >
          <ErrorBoundary>{this.props.children}</ErrorBoundary>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    padding: 0,
  } as ViewStyle,
});
