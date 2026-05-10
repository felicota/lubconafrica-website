export interface Distributor {
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  isHQ: boolean;
}

export const distributors: Distributor[] = [
  // ── Nigeria — HQ & internal hubs ──────────────────────────
  { name: 'LUBCON Africa HQ',         city: 'Ilorin',         state: 'Kwara State, Nigeria',     lat: 8.4966,  lng: 4.5421,   isHQ: true  },
  { name: 'Lagos African Distribution Hub',         city: 'Lagos',          state: 'Lagos State, Nigeria',     lat: 6.5244,  lng: 3.3792,   isHQ: false },
  { name: 'Abuja African Distribution Hub',         city: 'Abuja',          state: 'FCT, Nigeria',             lat: 9.0765,  lng: 7.3986,   isHQ: false },
  { name: 'Kano African Distribution Hub',          city: 'Kano',           state: 'Kano State, Nigeria',      lat: 12.0022, lng: 8.5920,   isHQ: false },
  { name: 'Port Harcourt African Distribution Hub', city: 'Port Harcourt',  state: 'Rivers State, Nigeria',    lat: 4.8156,  lng: 7.0498,   isHQ: false },
  { name: 'Ibadan African Distribution Hub',        city: 'Ibadan',         state: 'Oyo State, Nigeria',       lat: 7.3775,  lng: 3.9470,   isHQ: false },
  { name: 'Onitsha African Distribution Hub',       city: 'Onitsha',        state: 'Anambra State, Nigeria',   lat: 6.1400,  lng: 6.7870,   isHQ: false },
  { name: 'Kaduna African Distribution Hub',        city: 'Kaduna',         state: 'Kaduna State, Nigeria',    lat: 10.5105, lng: 7.4165,   isHQ: false },
  { name: 'Warri African Distribution Hub',         city: 'Warri',          state: 'Delta State, Nigeria',     lat: 5.5167,  lng: 5.7500,   isHQ: false },
  { name: 'Aba African Distribution Hub',           city: 'Aba',            state: 'Abia State, Nigeria',      lat: 5.1066,  lng: 7.3667,   isHQ: false },

  // ── International African Distribution Hubs ───────────────
  { name: 'Cotonou African Distribution Hub',       city: 'Cotonou',        state: 'Benin Republic',           lat: 6.3654,  lng: 2.4183,   isHQ: false },
  { name: 'Niamey African Distribution Hub',        city: 'Niamey',         state: 'Niger Republic',           lat: 13.5137, lng: 2.1098,   isHQ: false },
  { name: 'Ouagadougou African Distribution Hub',   city: 'Ouagadougou',    state: 'Burkina Faso',             lat: 12.3714, lng: -1.5197,  isHQ: false },
  { name: 'Lomé African Distribution Hub',          city: 'Lomé',           state: 'Republic of Togo',         lat: 6.1375,  lng: 1.2123,   isHQ: false },
  { name: 'Douala African Distribution Hub',        city: 'Douala',         state: 'Cameroon',                 lat: 4.0511,  lng: 9.7679,   isHQ: false },
  { name: 'Libreville African Distribution Hub',    city: 'Libreville',     state: 'Gabon',                    lat: 0.3901,  lng: 9.4544,   isHQ: false },
  { name: 'Bangui African Distribution Hub',        city: 'Bangui',         state: 'Central African Republic', lat: 4.3612,  lng: 18.5550,  isHQ: false },
  { name: 'Accra African Distribution Hub',         city: 'Accra',          state: 'Ghana',                    lat: 5.6037,  lng: -0.1870,  isHQ: false },
  { name: 'Addis Ababa African Distribution Hub',   city: 'Addis Ababa',    state: 'Ethiopia',                 lat: 8.9806,  lng: 38.7578,  isHQ: false },
  { name: 'Monrovia African Distribution Hub',      city: 'Monrovia',       state: 'Liberia',                  lat: 6.2907,  lng: -10.7605, isHQ: false },
];
