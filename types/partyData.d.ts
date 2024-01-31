interface PartyInfo {
  partyTitle: string;
  partyContent: string;
  partyPlaceName: string;
  partyTime: string;
  totalParticipant: number;
  longitude: number;
  latitude: number;
  gender: string;
  category: string;
  age: string;
  menu: string;
  thumbnail?: string;
  status?: string;
}

//yup schema type
interface PartyForm {
  partyTitle: string;
  partyContent: string;
  partyTime: string;
  gender: string;
  category: string;
  age: string;
  menu: string;
  totalParticipant: number;
  //yup에서 옵셔널체이닝의 타입 선언이 존재하지 않아 undefined로 타입 지정
  thumbnail: string | undefined;
  status: string | undefined;
}
