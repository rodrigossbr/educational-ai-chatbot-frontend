export interface BotMessage {
  id: number;
  role: 'user' | 'bot';
  text: string;
  helpful?: boolean;
  feedbackEnabled?: boolean;
  feedbackId?: number;
  detectedIntent?: string;
}
