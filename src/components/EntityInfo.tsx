import { default as React } from "react";
import { Linking, ScrollView, Text, View, Image, Share, Alert } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { LINK_24PX, SHARE_24PX } from "../images_generated";
import { Accommodations } from "../models/Accommodations";
import { AidCollection } from "../models/AidCollection";
import { AidRequest } from "../models/AidRequest";
import { Entity } from "../models/entities";
import { EntityType } from "../screens/common";
import * as Toasts from "../utils/toasts";
import * as Utils from "../utils/utils";

interface EntityInfoProps {
  entity: Entity;
}
class EntityInfoState {}
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

  render() {
    return (
      <ScrollView>
        <View style={{ flexDirection: "column", margin: 10 }}>
          <Text style={{ fontSize: 12 }}>Opis:</Text>
          <ShareableText text={this.props.entity.description} entity={this.props.entity} />

          {!!this.props.entity.contact_name && (
            <React.Fragment>
              <View style={{ margin: 5 }}></View>
              <Text style={{ fontSize: 12 }}>Contact:</Text>
              <ShareableText text={this.props.entity.contact_name} />
            </React.Fragment>
          )}

          {!!this.props.entity.contact_phone && (
            <React.Fragment>
              <View style={{ margin: 5 }}></View>
              <Text style={{ fontSize: 12 }}>Kontakt telefon:</Text>
              <ShareableText text={this.props.entity.contact_phone} onTextClick={this.callbackOnPhone} />
            </React.Fragment>
          )}

          {!!this.props.entity.tags && (
            <React.Fragment>
              <View style={{ margin: 5 }}></View>
              <Text style={{ fontSize: 12 }}>Tagovi:</Text>
              <ShareableText text={this.props.entity.contact_phone} />
            </React.Fragment>
          )}

          {!!this.props.entity.created_at && (
            <React.Fragment>
              <View style={{ margin: 5 }}></View>
              <Text style={{ fontSize: 12 }}>Unešeno:</Text>
              <ShareableText text={this.props.entity.created_at} />
            </React.Fragment>
          )}

          {/*
        {!!this.props.entity.comments && <React.Fragment>
          <View style={{margin: 5}}></View>
          {this.props.entity.comments?.map((comment, index) => <React.Fragment>
            <Text style={{fontSize: 12}}>Comment #{index+1}:</Text>
            <Text style={{fontWeight: "bold"}} selectable>{comment}</Text>
          </React.Fragment>)}
        </React.Fragment>}
        */}
        </View>
      </ScrollView>
    );
  }
}

interface ShareableTextProps {
  text: string;
  entity?: Entity;
  onTextClick?: () => void;
}
class ShareableTextState {}
class ShareableText extends React.Component<ShareableTextProps, ShareableTextState> {
  constructor(props: ShareableTextProps) {
    super(props);
    this.state = new ShareableTextState();
    Utils.bindAllPrefixedMethods(this);
  }

  async callbackOnShare() {
    try {
      await Share.share({ message: this.props.text })
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
          <Image style={{opacity: 0.5, marginHorizontal: 5}} source={SHARE_24PX} />
        </TouchableOpacity>
      </View>
    </View>
  }
}
