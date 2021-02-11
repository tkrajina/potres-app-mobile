export interface Category {
  id: 1;
  type_slug: string;
  type_name: string;
  available_in_public_menu: boolean;
  menu_title: string;
  plural_title: string;
  category_color_hex: string;
  add_entry_label: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  /*
        "category_map_pin_icon": {
          "id": 2,
          "name": "map-marker--help-needed.svg",
          "alternativeText": "",
          "caption": "",
          "width": 36,
          "height": 36,
          "formats": null,
          "hash": "map_marker_help_needed_cf731dfd9b",
          "ext": ".svg",
          "mime": "image/svg+xml",
          "size": 2.26,
          "url": "/uploads/map_marker_help_needed_cf731dfd9b.svg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-02-05T17:54:01.007Z",
          "updated_at": "2021-02-05T17:54:01.027Z"
        },
        "category_map_pin_icon_assigned": {
          "id": 3,
          "name": "map-marker--help-needed--assigned.svg",
          "alternativeText": "",
          "caption": "",
          "width": 36,
          "height": 36,
          "formats": null,
          "hash": "map_marker_help_needed_assigned_fa35602c2e",
          "ext": ".svg",
          "mime": "image/svg+xml",
          "size": 2.2,
          "url": "/uploads/map_marker_help_needed_assigned_fa35602c2e.svg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-02-05T17:54:06.267Z",
          "updated_at": "2021-02-05T17:54:06.279Z"
        }
*/
}

export interface Entity {
  id: number;
  title: string;
  location: string;
  location_latitude: number;
  location_longitude: number;
  description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_available_on_whatsapp: boolean;
  contact_available_on_telegram: boolean;
  status: any;
  assigned_coordinator: any;
  volunteer_assigned: any;
  done: boolean;
  follow_up_date: any;
  tags: string;
  date_from: any;
  date_until: any;
  entry_category: Category;
  notes: any;
  integrations_data: any;
  volunteer_marked_as_done: any;
  published_at: string;
  created_at: string;
  updated_at: string;
  comments: any[];
}
