export enum CHAT_ROLE {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export interface ISearchMemoryToolInput {
  query: string;
  userId: number;
  projectId?: number;
  sourceId?: number;
  noteId?: number;
}
