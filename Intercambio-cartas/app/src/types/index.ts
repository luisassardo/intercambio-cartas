// Types for Anonymous Letter Exchange

export interface Participant {
  id: string;
  pseudonym: string;
  email: string;
  name_encrypted: string;
  address_encrypted: string;
  city_encrypted: string;
  postal_code_encrypted: string;
  country_encrypted: string;
  is_hospice: boolean;
  hospice_name?: string;
  created_at: string;
  matched: boolean;
  matched_to?: string;
}

export interface Match {
  id: string;
  sender_id: string;
  receiver_id: string;
  sender_pseudonym: string;
  receiver_pseudonym: string;
  created_at: string;
  emails_sent: boolean;
}

export interface RegistrationData {
  email: string;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  customPseudonym?: string;
  isHospice: boolean;
  hospiceName?: string;
}

export interface AppState {
  participants: Participant[];
  matches: Match[];
  isAdmin: boolean;
  loading: boolean;
}

export type View = 'home' | 'register' | 'admin' | 'about' | 'privacy';
