/* Do not change, this code is generated from Golang structs */

import { EntityType } from "../screens/common";

/*
Example: https://relief-app-backend.herokuapp.com/accommodations
  {
    "id": 16,
    "location": "Dječja kolica i odjeća",
    "description": "Ako su Vam potrebna dječja kolica ili odjeća za odrasle i djecu slobodo se javite. MK Beštije",
    "startdate": null,
    "enddate": null,
    "number_of_adults": null,
    "number_of_children": null,
    "pets_allowed": null,
    "contact_name": "",
    "contact_phone": "092 113 9096 Zlatko",
    "available_on_whatsapp": false,
    "locationLat": 45.441528,
    "locationLon": 16.278763,
    "fulfilled": false,
    "published_at": "2021-01-04T22:45:18.250Z",
    "created_at": "2021-01-04T22:45:18.267Z",
    "updated_at": "2021-01-04T22:45:18.267Z",
    "volunteer_assigned": null,
    "notes": "URL na izvorni item na Potres2020: https://potres2020.openit.hr/posts/764     Dodatni info iz Potres2020: undefined",
    "submitter_ip": null,
    "tags": null,
    "original_app_id": 764,
    "volunteerMarkedAsDone": null,
    "assigned_dispatcher": null,
    "comments": []
  }
*/

export class Accommodations {
  type?: EntityType;

  assigned_dispatcher: any;
  available_on_whatsapp: boolean;
  comments: any[];
  contact_name: string;
  contact_phone: string;
  created_at: string;
  description: string;
  enddate: any;
  fulfilled: boolean;
  id: number;
  location: string;
  locationLat: number;
  locationLon: number;
  notes: string;
  number_of_adults: any;
  number_of_children: any;
  original_app_id: number;
  pets_allowed: any;
  published_at: string;
  startdate: any;
  submitter_ip: any;
  tags: any;
  updated_at: string;
  volunteerMarkedAsDone: any;
  volunteer_assigned: any;

  static createFrom(source: any = {}) {
    return new Accommodations(source);
  }

  constructor(source: any = {}) {
    if ("string" === typeof source) source = JSON.parse(source);
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
    this.notes = source["notes"];
    this.number_of_adults = source["number_of_adults"];
    this.number_of_children = source["number_of_children"];
    this.original_app_id = source["original_app_id"];
    this.pets_allowed = source["pets_allowed"];
    this.published_at = source["published_at"];
    this.startdate = source["startdate"];
    this.submitter_ip = source["submitter_ip"];
    this.tags = source["tags"];
    this.updated_at = source["updated_at"];
    this.volunteerMarkedAsDone = source["volunteerMarkedAsDone"];
    this.volunteer_assigned = source["volunteer_assigned"];
  }
}
