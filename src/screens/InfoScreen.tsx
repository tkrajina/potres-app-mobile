import { default as React } from "react";
import { ActivityIndicator, Button, StyleSheet, Text } from "react-native";
import { AppScreenView } from "../components/AppScreenView";
import { HorizontalLine } from "../components/HorizontalLine";
import { SimplifiedMarkdown } from "../components/SimplifiedMarkdown";
import { stores } from "../stores/RootStore";
import { CleanupContainer } from "../utils/cleanup";
import * as Utils from "../utils/utils";
import * as Toasts from "../utils/toasts";
import { ScreenProps } from "./common";

class State {
  dataImported = stores.dataImportedAt;
  importing = false;
}

export default class InfoScreen extends React.Component<ScreenProps, State> {
  cleanup = new CleanupContainer();

  constructor(props: ScreenProps) {
    super(props);
    this.state = new State();
    this.props.navigation.addListener("focus", this.willFocus.bind(this));
    this.props.navigation.addListener("blur", this.didBlur.bind(this));
    Utils.bindAllPrefixedMethods(this);
  }

  async willFocus() {
    this.cleanup.triggerObservableStateChanges("observable maps screen", this);
  }

  didBlur() {
    this.cleanup.cleanup();
  }

  async callbackOnReload() {
    try {
      this.setState({ importing: true });
      await stores.reloadDataAsync();
      Toasts.short("Imported");
    } catch (e) {
      Toasts.error("Greška u importiranju podataka");
    } finally {
      this.setState({ importing: false });
    }
  }

  render() {
    const imported = this.state.dataImported.get();
    return (
      <AppScreenView navigation={this.props.navigation} title="Info" withDefaultPadding>
        <SimplifiedMarkdown text={INFO} />
        <HorizontalLine marginVertical={30} />
        <Text style={{ fontSize: 20 }}>Podaci importirani {imported ? `prije ${Math.floor((Date.now() - imported) / (1000 * 60))}min` : "nikad"}</Text>
        <HorizontalLine marginVertical={30} />
        {this.state.importing && <ActivityIndicator color="gray" size="large" />}
        {!this.state.importing && <Button title="Reload podataka" onPress={this.callbackOnReload} />}
      </AppScreenView>
    );
  }
}

const STYLES = StyleSheet.create({});

const INFO = `# Potres.app

Više informacija: <https://potres.app>
`;
