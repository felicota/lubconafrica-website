export interface Distributor {
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  isHQ: boolean;
}

export const distributors: Distributor[] = [
  { name: 'LUBCON Africa HQ', city: 'Ilorin', state: 'Kwara State', lat: 8.4966, lng: 4.5421, isHQ: true },
  { name: 'Lagos Distribution Hub', city: 'Lagos', state: 'Lagos State', lat: 6.5244, lng: 3.3792, isHQ: false },
  { name: 'Abuja Distribution Hub', city: 'Abuja', state: 'FCT', lat: 9.0765, lng: 7.3986, isHQ: false },
  { name: 'Kano Distribution Hub', city: 'Kano', state: 'Kano State', lat: 12.0022, lng: 8.5920, isHQ: false },
  { name: 'Port Harcourt Hub', city: 'Port Harcourt', state: 'Rivers State', lat: 4.8156, lng: 7.0498, isHQ: false },
  { name: 'Ibadan Distribution Hub', city: 'Ibadan', state: 'Oyo State', lat: 7.3775, lng: 3.9470, isHQ: false },
  { name: 'Onitsha Distribution Hub', city: 'Onitsha', state: 'Anambra State', lat: 6.1400, lng: 6.7870, isHQ: false },
  { name: 'Kaduna Distribution Hub', city: 'Kaduna', state: 'Kaduna State', lat: 10.5105, lng: 7.4165, isHQ: false },
  { name: 'Warri Distribution Hub', city: 'Warri', state: 'Delta State', lat: 5.5167, lng: 5.7500, isHQ: false },
  { name: 'Aba Distribution Hub', city: 'Aba', state: 'Abia State', lat: 5.1066, lng: 7.3667, isHQ: false },
];
