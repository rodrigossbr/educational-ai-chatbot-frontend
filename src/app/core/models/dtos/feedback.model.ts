export interface Feedback {
  id?: number;
  sessionId: number;
  userQuestion: string;
  botAnswer: string;
  helpful?: boolean;
}
