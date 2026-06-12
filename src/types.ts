export type Language = 'en' | 'te';

export interface Bank {
  id: string;
  name: string;
  teluguName: string;
  logo: string;
  workingHours: string;
  workingHoursTelugu: string;
  customerCare: string;
  email: string;
  website: string;
  branchLocatorUrl: string;
  ifscPrefix: string;
}

export interface DocumentInfo {
  id: string;
  title: string;
  titleTelugu: string;
  category: 'identity' | 'address' | 'banking' | 'other';
  requirements: string[];
  requirementsTelugu: string[];
  description: string;
  descriptionTelugu: string;
}

export interface Holiday {
  id: string;
  name: string;
  nameTelugu: string;
  date: string;
  type: 'national' | 'state' | 'rbi' | 'festival';
  states: string[];
  month: string; // "January", etc.
}

export interface Offer {
  id: string;
  bankId: string;
  title: string;
  titleTelugu: string;
  category: 'fd' | 'savings' | 'card' | 'loan' | 'scheme';
  description: string;
  descriptionTelugu: string;
  rate?: string;
  tag?: string;
}

export interface TokenBooking {
  id: string;
  tokenNumber: string;
  name: string;
  mobile: string;
  email: string;
  bankId: string;
  branchName: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  qrCodeUrl: string;
  status: 'waiting' | 'called' | 'completed';
  positionInQueue: number;
}

export interface FAQ {
  id: string;
  question: string;
  questionTelugu: string;
  answer: string;
  answerTelugu: string;
  category: string;
}
