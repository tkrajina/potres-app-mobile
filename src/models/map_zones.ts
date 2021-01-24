export function hexToRgb(hex: string, opacity: number): string {
  hex = hex.replace("#", "");
  if (hex.length != 6) {
    throw "Only six-digit hex colors are allowed.";
  }
  var aRgbHex: any = hex.match(/.{1,2}/g);
  return `rgba(${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(aRgbHex[2], 16)}, ${opacity})`;
}

export const MAP_ZONES: {
  name: string;
  color: string;
  polygon: { lng: number; lat: number }[];
}[] = [
  {
    name: "Nebojan i okolica",
    color: "#2ecc71",
    polygon: [
      {
        lng: 16.003340853451395,
        lat: 45.54758831119227,
      },
      {
        lng: 16.417174261445112,
        lat: 45.55059003914044,
      },
      {
        lng: 16.302642438643304,
        lat: 45.50260794239341,
      },
      {
        lng: 16.18044030530722,
        lat: 45.45188505631597,
      },
      {
        lng: 16.003457905303257,
        lat: 45.3795794948337,
      },
      {
        lng: 16.003340853451395,
        lat: 45.54758831119227,
      },
    ],
  },
  {
    name: "Gornji Hrastovac i okolica",
    color: "#3498db",
    polygon: [
      {
        lng: 16.299833194198794,
        lat: 45.26831147094645,
      },
      {
        lng: 16.604402112724156,
        lat: 45.269382396365515,
      },
      {
        lng: 16.606474669805447,
        lat: 45.448456805293795,
      },
      {
        lng: 16.482199979388078,
        lat: 45.4210843473792,
      },
      {
        lng: 16.44065338186195,
        lat: 45.408292523967916,
      },
      {
        lng: 16.35718860160749,
        lat: 45.342898369818016,
      },
      {
        lng: 16.299833194198794,
        lat: 45.26831147094645,
      },
    ],
  },
  {
    name: "Sisak i okolica",
    color: "#9b59b6",
    polygon: [
      {
        lng: 16.302642438643304,
        lat: 45.50260794239341,
      },
      {
        lng: 16.417174261445112,
        lat: 45.55059003914044,
      },
      {
        lng: 16.604812085813165,
        lat: 45.553989832162195,
      },
      {
        lng: 16.606474669805447,
        lat: 45.448456805293795,
      },
      {
        lng: 16.482199979388078,
        lat: 45.4210843473792,
      },
      {
        lng: 16.44065338186195,
        lat: 45.408292523967916,
      },
      {
        lng: 16.302642438643304,
        lat: 45.50260794239341,
      },
    ],
  },
  {
    name: "Petrinja i okolica",
    color: "#f1c40f",
    polygon: [
      {
        lng: 16.18044030530722,
        lat: 45.45188505631597,
      },
      {
        lng: 16.302642438643304,
        lat: 45.50260794239341,
      },
      {
        lng: 16.44065338186195,
        lat: 45.408292523967916,
      },
      {
        lng: 16.35718860160749,
        lat: 45.342898369818016,
      },
      {
        lng: 16.18044030530722,
        lat: 45.45188505631597,
      },
    ],
  },
  {
    name: "Glina i Strašnik",
    color: "#e74c3c",
    polygon: [
      {
        lng: 16.35718860160749,
        lat: 45.342898369818016,
      },
      {
        lng: 16.299833194198794,
        lat: 45.26831147094645,
      },
      {
        lng: 16.00439432011809,
        lat: 45.26831147094647,
      },
      {
        lng: 16.003457905303257,
        lat: 45.3795794948337,
      },
      {
        lng: 16.18044030530722,
        lat: 45.45188505631597,
      },
      {
        lng: 16.35718860160749,
        lat: 45.342898369818016,
      },
    ],
  },
];
