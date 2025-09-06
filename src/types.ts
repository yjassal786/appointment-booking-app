export interface QuestionnaireData {
  goal: string;
  experience: string;
  timeCommitment: string;
  equipment: string;
  bodyType: string;
  age: string;
  gender: string;
  challenges: string[];
}

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  paymentScreenshot?: File;
}