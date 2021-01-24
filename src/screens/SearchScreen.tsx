import { default as React } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AppScreenView } from "../components/AppScreenView";
import { EntityInfo } from "../components/EntityInfo";
import { HorizontalLine } from "../components/HorizontalLine";
import { BASELINE_CANCEL_24PX, BASELINE_SEARCH_24PX } from "../images_generated";
import { Entity } from "../models/entities";
import { stores } from "../stores/RootStore";
import { LAYOUT_STYLES } from "../styles/styles";
import { CleanupContainer } from "../utils/cleanup";
import * as Utils from "../utils/utils";
import { EntityType, ScreenProps } from "./common";

const DIM = Dimensions.get("window");

class State {
  type: EntityType = EntityType.ACCOMODATIONS;
  searchString = "";
  searching = false;
  entities: Entity[] = [];
}

export default class SearchScreen extends React.Component<ScreenProps, State> {
  cleanup = new CleanupContainer();
  timeout: any;

  constructor(props: ScreenProps) {
    super(props);
    this.state = new State();
    this.props.navigation.addListener("focus", this.willFocus.bind(this));
    this.props.navigation.addListener("blur", this.didBlur.bind(this));
    Utils.bindAllPrefixedMethods(this);
  }

  async willFocus() {
    this.cleanup.triggerObservableStateChanges("observable maps screen", this);
    await this.searchAsync();
  }

  async searchAsync() {
    const str = this.state.searchString?.toLowerCase();
    let list: Entity[] = [];
    switch (this.state.type) {
      case EntityType.ACCOMODATIONS:
        list = stores.accomodations.get().filter((a) => a.description.toLowerCase().indexOf(str) >= 0);
        break;
      case EntityType.AID_COLLECTION:
        list = stores.aidCollections.get().filter((a) => a.description.toLowerCase().indexOf(str) >= 0);
        break;
      case EntityType.AID_REQUEST:
        list = stores.aidRequests.get().filter((a) => a.description.toLowerCase().indexOf(str) >= 0);
        break;
    }
    this.setState({
      entities: list,
      searching: false,
    });
  }

  callbackOnSearchStringAsync(str: string) {
    this.setState({
      searchString: str,
      searching: true,
    });
    clearTimeout(this.timeout);
    this.timeout = this.cleanup.setTimeout(() => this.searchAsync(), str ? 1000 : 0);
  }

  async callbackOnReset() {
    this.setState({ searchString: "" });
    await this.searchAsync();
  }

  async callbackOnChangeEntity(e: EntityType) {
    this.setState({ type: e }, async () => {
      await this.searchAsync();
    });
  }

  didBlur() {
    this.cleanup.cleanup();
  }

  render() {
    return (
      <AppScreenView navigation={this.props.navigation} title="Pretraživanje">
        <View style={{ flex: 1 }}>
          <FlatList onScrollToIndexFailed={() => {}} data={this.state.entities} renderItem={(e) => <React.Fragment>
            {e.index > 0 && <HorizontalLine />}
            <EntityInfo entity={e.item as Entity} />
          </React.Fragment>
          } keyExtractor={(e, _index) => "" + e.id} />
          <View style={{ height: 50, flexDirection: "row", alignContent: "center", alignItems: "center" }}>
            {Object.keys(EntityType).map((e) => this.renderEntityButton((EntityType as any)[e] as EntityType))}
          </View>
          <View style={[LAYOUT_STYLES.directionRow, { borderWidth: 1, borderColor: "#ddd", height: 50, marginHorizontal: 5, marginVertical: 10, borderRadius: 10 }]}>
            <TextInput
              placeholder="Filter"
              value={this.state.searchString}
              onChangeText={this.callbackOnSearchStringAsync}
              style={[LAYOUT_STYLES.flex1, { borderRadius: 10, fontSize: 18, marginHorizontal: 10, marginVertical: 5 }]}
            />
            <TouchableWithoutFeedback onPress={this.callbackOnReset}>
              <View style={[LAYOUT_STYLES.centerContent, { width: 40, paddingVertical: 14 }]}>
                <View style={[LAYOUT_STYLES.centerSelf, { opacity: 0.5 }]}>
                  {this.state.searching && <ActivityIndicator size="small" color="#aaa" />}
                  {!this.state.searching && (this.state.searchString ? <Image source={BASELINE_CANCEL_24PX} /> : <Image source={BASELINE_SEARCH_24PX} />)}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </AppScreenView>
    );
  }

  renderEntityButton(e: EntityType) {
    return (
      <TouchableWithoutFeedback key={e} onPress={() => this.callbackOnChangeEntity(e)} style={e == this.state.type ? STYLES.entityButton : STYLES.entityButtonDisabled}>
        <Text style={e == this.state.type ? STYLES.entityText : STYLES.entityTextDisabled}>{e}</Text>
      </TouchableWithoutFeedback>
    );
  }
}

const STYLES = StyleSheet.create({
  entityButton: {
    backgroundColor: "#ffcc5e",
    borderRadius: 10,
    borderColor: "#efefef",
    marginHorizontal: 5,
    width: DIM.width / 3.5,
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  entityButtonDisabled: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    borderColor: "#efefef",
    marginHorizontal: 5,
    width: DIM.width / 3.5,
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  entityText: {
    fontSize: 11,
    alignSelf: "center",
    fontWeight: "bold",
  },
  entityTextDisabled: {
    fontSize: 11,
    alignSelf: "center",
  },
});
