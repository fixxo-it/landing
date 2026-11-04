/* The choices on the waitlist form. The form renders them and the API accepts
   only these, so the database never fills up with values the team has not seen.
   The last area keeps the required field from being a dead end for anyone whose
   locality is missing. */
export const OTHER = 'Other';
export const NEAR_AREAS = ['Whitefield', 'Varthur', 'Mahadevapura'];
export const AGES = ['0–3 months', '3–12 months', '1–3 years', '4 years and above'];
export const STARTS = ['Within 2 weeks', 'Within a month', 'In 1–3 months', 'Just exploring'];

export const NOT_LISTED = 'Not listed here';

export const BENGALURU_AREAS = [
  'Adugodi', 'Agara', 'Akshaya Nagar', 'Amruthahalli', 'Anand Nagar', 'Anekal', 'Arekere', 'Attibele', 'Austin Town', 'Avalahalli',
  'Banashankari', 'Banaswadi', 'Bannerghatta Road', 'Basavanagudi', 'Basaveshwaranagar', 'Begur', 'Bellandur', 'Benson Town', 'Bommanahalli', 'Bommasandra', 'Brookefield', 'BTM Layout', 'Byatarayanapura',
  'C V Raman Nagar', 'Chandapura', 'Chickpet', 'Cooke Town', 'Cox Town', 'Cunningham Road',
  'Dasarahalli', 'Devanahalli', 'Doddanekundi', 'Dollars Colony', 'Domlur',
  'Electronic City',
  'Frazer Town',
  'Gandhi Nagar', 'Ganganagar', 'Girinagar', 'Gottigere',
  'Hebbal', 'Hegde Nagar', 'Hennur', 'Herohalli', 'Hoodi', 'Horamavu', 'Hoskote', 'Hosur Road', 'HRBR Layout', 'HSR Layout', 'Hulimavu',
  'Indiranagar', 'ITPL',
  'J P Nagar', 'Jakkur', 'Jalahalli', 'Jayanagar', 'Jeevan Bima Nagar', 'Jigani',
  'Kadubeesanahalli', 'Kadugodi', 'Kaggadasapura', 'Kalyan Nagar', 'Kammanahalli', 'Kanakapura Road', 'Kasavanahalli', 'Kengeri', 'Koramangala', 'Kothanur', 'KR Puram', 'Kudlu', 'Kumaraswamy Layout', 'Kundalahalli',
  'Lavelle Road',
  'Magadi Road', 'Mahalakshmi Layout', 'Malleshwaram', 'Marathahalli', 'Mathikere', 'MG Road', 'Mysore Road',
  'Nagarbhavi', 'Nagavara', 'Nandini Layout', 'Narayanapura',
  'Old Airport Road',
  'Padmanabhanagar', 'Panathur', 'Peenya',
  'Rajajinagar', 'Rajarajeshwari Nagar', 'Ramamurthy Nagar', 'Residency Road', 'Richmond Town', 'RT Nagar',
  'Sadashivanagar', 'Sahakar Nagar', 'Sanjay Nagar', 'Sarjapur Road', 'Seshadripuram', 'Shanthi Nagar', 'Shivajinagar', 'Singasandra',
  'Thanisandra', 'Thippasandra',
  'Uttarahalli',
  'Vasanth Nagar', 'Vidyaranyapura', 'Vignan Nagar', 'Vijayanagar',
  'Yelahanka', 'Yemalur', 'Yeshwanthpur',
  NOT_LISTED,
];
