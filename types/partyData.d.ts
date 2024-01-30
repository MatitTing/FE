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

interface PartyForm {
  partyTitle: string;
  partyContent: string;
  partyTime: string;
  gender: string;
  category: string;
  age: string;
  thumbnail: string;
  menu: string;
  totalParticipant: number;
  status: string | undefined;
}
