import { default as React } from "react";
import { Alert, Image, Linking, ScrollView, Share, StyleSheet, Text, TextStyle, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CONTENT_COPY_24PX } from "../images_generated";
import { Entity } from "../models/entities";
import { EntityType } from "../screens/common";
import * as Toasts from "../utils/toasts";
import * as Utils from "../utils/utils";
import Clipboard from 'expo-clipboard';

interface EntityInfoProps {
  entity: Entity;
}
class EntityInfoState {
  short: boolean = true;
}
export class EntityInfo extends React.PureComponent<EntityInfoProps, EntityInfoState> {
  constructor(props: EntityInfoProps) {
    super(props);
    this.state = new EntityInfoState();
    Utils.bindAllPrefixedMethods(this);
  }

  callbackOnPhone() {
    try {
      Linking.openURL(`tel:${this.props.entity.contact_phone}`);
    } catch (e) {
      Toasts.error("Error opening dialer");
    }
  }

  callbackOnMore() {
    this.setState({ short: !this.state.short })
  }

  render() {
    const start = (this.props.entity as any)?.startdate || "";
    const end = (this.props.entity as any)?.enddate || "";
    return (
      <ScrollView>
        <View style={{ flexDirection: "column", margin: 10 }}>
          <Text style={{ fontSize: 12 }}>Opis:</Text>
          <ClipboardParams text={this.state.short ? this.props.entity.description?.substr(0, 50) + "..." : this.props.entity.description} entity={this.props.entity} />

          <Field label="Contact">
            <ClipboardParams text={this.props.entity.contact_name || "-"} />
          </Field>

          <Field label="Kontakt telefon">
            <ClipboardParams text={this.props.entity.contact_phone || "-"} onTextClick={this.callbackOnPhone} />
          </Field>

          <Field label="Dobrovoljac">
            <Text style={STYLES.bold}>
              {(this.props.entity as any)?.volunteer_assigned || "?"}
            </Text>
          </Field>

          <Field label="Dobrovoljac označio kao završeno">
            <Text style={STYLES.bold}>
              {this.props.entity.volunteerMarkedAsDone || "-"}
            </Text>
          </Field>

          {!!this.props.entity.tags && (
            <Field label="Tagovi">
              <ClipboardParams text={this.props.entity.contact_phone} />
            </Field>
          )}

          <Field label="Unešeno">
            <ClipboardParams text={this.props.entity.created_at || "-"} />
          </Field>

          {!this.state.short && <React.Fragment>
            {!!(start && end) && 
              <Field label="Početak-kraj:">
                <Text style={STYLES.bold}>{start} - {end}</Text>
              </Field>
            }

            <Field label="Dispecher">
                <Text style={STYLES.bold}>{this.props.entity.assigned_dispatcher || "-"}</Text>
            </Field>

            <Field label="Bilješke">
              <ClipboardParams text={(this.props.entity as any)?.notes} />
            </Field>

            <Field label="Izmijenjeno">
              <Text style={STYLES.bold}>{this.props.entity.updated_at}</Text>
            </Field>
          </React.Fragment>}

          {/*
          {!!this.props.entity.comments && <React.Fragment>
            <View style={{margin: 5}}></View>
            {this.props.entity.comments?.map((comment, index) => <React.Fragment>
              <Text style={{fontSize: 12}}>Comment #{index+1}:</Text>
              <Text style={{fontWeight: "bold"}} selectable>{comment}</Text>
            </React.Fragment>)}
          </React.Fragment>}
          */}

          <TouchableOpacity onPress={this.callbackOnMore}>
            <Text style={{color: "brown"}}>{this.state.short ? "Show more" : "Show less"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

interface ClipboardTextParams {
  text: string;
  entity?: Entity;
  onTextClick?: () => void;
}
class ClipboardParams extends React.PureComponent<ClipboardTextParams> {
  constructor(props: ClipboardTextParams) {
    super(props);
    Utils.bindAllPrefixedMethods(this);
  }

  async callbackOnShare() {
    try {
      Clipboard.setString(this.props.text);
      Alert.alert("Kopirano");
    } catch (e) {
      console.error(e);
      Toasts.error("Error sharing");
    }
  }

  async callbackOnTextPress() {
    if (this.props.onTextClick) {
      this.props.onTextClick();
    } else if (this.props.entity) {
      let baseUrl = "https://potres.app";
      try {
        if (this.props.entity?.type === EntityType.AID_COLLECTION) {
          baseUrl += `/prikup-donacija/${this.props.entity?.id}`;
        } else if (this.props.entity?.type === EntityType.ACCOMODATIONS) {
          baseUrl += `/smjestaj/${this.props.entity?.id}`;
        } else if (this.props.entity?.type === EntityType.AID_REQUEST) {
          baseUrl += `/trazim-pomoc/${this.props.entity?.id}`;
        } else {
          console.error("Invalid type " + JSON.stringify(this.props.entity.type));
          return;
        }
        await Linking.openURL(baseUrl);
      } catch (e) {
        console.error(e);
      }
    }
  }

  render() {
    return <View style={{flexDirection: "row"}}>
      <View style={{flex: 1}}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: this.props.onTextClick || this.props.entity ? "blue" : undefined }} onPress={this.callbackOnTextPress} >{this.props.text || "[empty]"}</Text>
      </View>
      <View style={{width: 30, flexDirection: "column"}}>
        <TouchableOpacity onPress={this.callbackOnShare}>
          <Image style={{opacity: 0.5, marginHorizontal: 5}} source={CONTENT_COPY_24PX} />
        </TouchableOpacity>
      </View>
    </View>
  }
}

interface FieldProps {
  label: string;
}
class Field extends React.PureComponent<FieldProps> {

    constructor(props: FieldProps) {
        super(props);
    }

    render() {
      return (
            <React.Fragment>
              <View style={{ margin: 5 }}></View>
              <Text style={{ fontSize: 12 }}>{this.props.label}:</Text>
              {this.props.children}
            </React.Fragment>);
      }
}

const STYLES = StyleSheet.create({
  bold: { fontWeight: "bold" } as TextStyle
})