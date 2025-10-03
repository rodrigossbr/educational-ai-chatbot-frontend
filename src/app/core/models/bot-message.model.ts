export interface BotMessage {
  id: number;
  role: 'user' | 'bot';
  text: string;
}
