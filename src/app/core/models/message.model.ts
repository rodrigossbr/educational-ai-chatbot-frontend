export interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}
