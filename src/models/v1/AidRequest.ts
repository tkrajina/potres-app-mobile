/* Do not change, this code is generated from Golang structs */

import { EntityType } from "../screens/common";

/*
Example
  {
    "id": 261,
    "location": "Transport",
    "description": "Tražim prijevoz za 500 bala sijena",
    "contact_name": "098 1811291",
    "contact_phone": "",
    "available_on_whatsapp": false,
    "locationLat": 44.851455,
    "locationLon": 15.414505,
    "fulfilled": false,
    "published_at": "2021-01-07T13:40:03.225Z",
    "created_at": "2021-01-07T13:40:03.227Z",
    "updated_at": "2021-01-07T13:40:03.227Z",
    "volunteer_assigned": null,
    "notes": "URL na izvorni item na Potres2020: https://potres2020.openit.hr/posts/862     Dodatni info iz Potres2020: Tražim prijevoz za 500 bala sijena od Vrhovina/Otočca do Petrinje. Oko 8 tona.",
    "tags": null,
    "original_app_id": 862,
    "volunteerMarkedAsDone": null,
    "status": null,
    "assigned_dispatcher": null,
    "comments": []
  }
*/

export class AidRequest {
  type?: EntityType;

  assigned_dispatcher: any;
  available_on_whatsapp: boolean;
  comments: string[];
  contact_name: string;
  contact_phone: string;
  created_at: string;
  description: string;
  fulfilled: boolean;
  id: number;
  location: string;
  locationLat: number;
  locationLon: number;
  notes: string;
  original_app_id: number;
  published_at: string;
  status: any;
  tags: any;
  updated_at: string;
  volunteerMarkedAsDone: any;
  volunteer_assigned: any;

  static createFrom(source: any = {}) {
    return new AidRequest(source);
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
    this.fulfilled = source["fulfilled"];
    this.id = source["id"];
    this.location = source["location"];
    this.locationLat = source["locationLat"];
    this.locationLon = source["locationLon"];
    this.notes = source["notes"];
    this.original_app_id = source["original_app_id"];
    this.published_at = source["published_at"];
    this.status = source["status"];
    this.tags = source["tags"];
    this.updated_at = source["updated_at"];
    this.volunteerMarkedAsDone = source["volunteerMarkedAsDone"];
    this.volunteer_assigned = source["volunteer_assigned"];
  }
}
