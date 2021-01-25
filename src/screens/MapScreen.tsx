import { default as React } from "react";
import { Button, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import { AppScreenView } from "../components/AppScreenView";
import { EntityInfo } from "../components/EntityInfo";
import { Entity } from "../models/entities";
import { hexToRgb, MAP_ZONES } from "../models/map_zones";
import { stores } from "../stores/RootStore";
import { CleanupContainer } from "../utils/cleanup";
import * as Utils from "../utils/utils";
import { EntityType, ScreenProps } from "./common";

class State {
  aidRequests = stores.aidRequests;
  accomodations = stores.accomodations;
  aidCollections = stores.aidCollections;
  selected: Entity | undefined;
}

export default class MapScreen extends React.Component<ScreenProps, State> {
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

  callbackOnSelect(selected: Entity) {
    this.setState({ selected: selected });
  }

  callbackOnCloseEntityInfo() {
    this.setState({ selected: undefined });
  }

  render() {
    let minLat = MAP_ZONES[0].polygon[0].lat;
    let minLon = MAP_ZONES[0].polygon[0].lng;
    let maxLat = minLat;
    let maxLon = minLon;
    MAP_ZONES.map((zone) =>
      zone.polygon.map((c) => {
        minLat = Math.min(minLat, c.lat);
        maxLat = Math.max(maxLat, c.lat);
        minLon = Math.min(minLon, c.lng);
        maxLon = Math.max(maxLon, c.lng);
      })
    );

    return (
      <AppScreenView navigation={this.props.navigation} title="Potres.app">
        {/*
        {this.state.aidRequests?.map(ar => <AppText>{ar.description} {ar.locationLat},{ar.locationLon}</AppText>)}
        <Text>{JSON.stringify(this.state.aidRequests)}</Text>
        */}
        <View style={this.state.selected ? STYLES.flexHalf : STYLES.flex1}>
          <MapView
            mapType="standard"
            zoomTapEnabled
            zoomControlEnabled
            zoomEnabled
            showsMyLocationButton={true}
            showsUserLocation={true}
            //followsUserLocation={true}
            style={STYLES.flex1}
            initialRegion={{
              latitude: (minLat + maxLat) / 2,
              longitude: (minLon + maxLon) / 2,
              latitudeDelta: (maxLat - minLat) * 1.25,
              longitudeDelta: (maxLon - minLon) * 1.25,
            }}
          >
            {MAP_ZONES.map((zone) => (
              <Polygon coordinates={zone.polygon.map((c) => ({ latitude: c.lat, longitude: c.lng } as LatLng))} fillColor={hexToRgb(zone.color, 0.25)} strokeWidth={0.01} />
            ))}
            {this.state.aidRequests?.get()?.map((ar) => (
              <EntityMarker key={`ar-${ar.id}`} entity={ar} color="orange" onSelect={this.callbackOnSelect} />
            ))}
            {this.state.accomodations?.get()?.map((ar) => (
              <EntityMarker key={`ac-${ar.id}`} entity={ar} color="blue" onSelect={this.callbackOnSelect} />
            ))}
            {this.state.aidCollections?.get()?.map((ar) => (
              <EntityMarker key={`ac-${ar.id}`} entity={ar} color="green" onSelect={this.callbackOnSelect} />
            ))}
          </MapView>
        </View>
        {this.state.selected && (
          <View style={STYLES.flexHalf}>
            <EntityInfo entity={this.state.selected} />
            <Button title="Close" onPress={this.callbackOnCloseEntityInfo} />
          </View>
        )}
      </AppScreenView>
    );
  }
}

const STYLES = StyleSheet.create({
  flex1: { flex: 1 },
  flexHalf: { flex: 0.5 },
  modalView: {
    borderColor: "#555",
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    marginVertical: 55,

    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 20,
  } as ViewStyle,
});

interface EntityMarkerProps {
  entity: Entity;
  color: string;
  onSelect: (entity: Entity) => void;
}
class EntityMarker extends React.Component<EntityMarkerProps> {
  constructor(props: EntityMarkerProps) {
    super(props);
    Utils.bindAllPrefixedMethods(this);
  }

  callbackOnPress() {
    if (!this.props.onSelect) {
      return;
    }
    this.props.onSelect(this.props.entity);
  }

  render() {
    if (!this.props.entity) {
      return null;
    }
    if (!this.props.entity.locationLat || !this.props.entity.locationLon) {
      return null;
    }
    return (
      <Marker
        key={`aidreq_${this.props.entity.id}`}
        title={this.props.entity.description?.length > 100 ? this.props.entity.description.substr(0, 100) + "..." : this.props.entity.description}
        coordinate={
          {
            latitude: this.props.entity.locationLat,
            longitude: this.props.entity.locationLon,
          } as LatLng
        }
        pinColor={this.props.color}
        onPress={this.callbackOnPress}
      />
    );
  }
}
