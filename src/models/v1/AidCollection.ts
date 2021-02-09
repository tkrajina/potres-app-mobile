/* Do not change, this code is generated from Golang structs */

import { EntityType } from "../screens/common";

/*
Example:
  {
    "id": 2,
    "location": "NK Jarun, Ogulinska ulica, Zagreb, Croatia",
    "aid_destination": "Petrinja",
    "startdate": "2021-01-02T06:00:00.000Z",
    "enddate": "2021-01-02T11:00:00.000Z",
    "description": "U prostorijama NK Jarun skupljamo pomoc za Petrinju",
    "contact_name": "Hrvoje",
    "contact_phone": "0",
    "available_on_whatsapp": false,
    "locationLat": 45.7926677,
    "locationLon": 15.9308061,
    "fulfilled": false,
    "published_at": "2021-01-02T00:30:16.557Z",
    "created_at": "2021-01-02T00:30:16.564Z",
    "updated_at": "2021-01-02T00:30:16.564Z",
    "tags": null,
    "original_app_id": null,
    "volunteerMarkedAsDone": null,
    "assigned_dispatcher": null,
    "comments": []
  }
*/

export class AidCollection {
  type?: EntityType;

  aid_destination: string;
  assigned_dispatcher: any;
  available_on_whatsapp: boolean;
  comments: any[];
  contact_name: string;
  contact_phone: string;
  created_at: string;
  description: string;
  enddate: string;
  fulfilled: boolean;
  id: number;
  location: string;
  locationLat: number;
  locationLon: number;
  original_app_id: any;
  published_at: string;
  startdate: string;
  tags: any;
  updated_at: string;
  volunteerMarkedAsDone: any;

  static createFrom(source: any = {}) {
    return new AidCollection(source);
  }

  constructor(source: any = {}) {
    if ("string" === typeof source) source = JSON.parse(source);
    this.aid_destination = source["aid_destination"];
    this.assigned_dispatcher = source["assigned_dispatcher"];
    this.available_on_whatsapp = source["available_on_whatsapp"];
    this.comments = source["comments"];
    this.contact_name = source["contact_name"];
    this.contact_phone = source["contact_phone"];
    this.created_at = source["created_at"];
    this.description = source["description"];
    this.enddate = source["enddate"];
    this.fulfilled = source["fulfilled"];
    this.id = source["id"];
    this.location = source["location"];
    this.locationLat = source["locationLat"];
    this.locationLon = source["locationLon"];
    this.original_app_id = source["original_app_id"];
    this.published_at = source["published_at"];
    this.startdate = source["startdate"];
    this.tags = source["tags"];
    this.updated_at = source["updated_at"];
    this.volunteerMarkedAsDone = source["volunteerMarkedAsDone"];
  }
}
