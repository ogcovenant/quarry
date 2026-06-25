export interface BaseIndexMemoryInput {
  content: string;
  contentVersion: string;
  metadata: Record<string, unknown>;
  projectId?: number;
  userId: number;
}

export interface IndexSourceMemoryInput extends BaseIndexMemoryInput {
  sourceId: number;
}

export interface IndexNoteMemoryInput extends BaseIndexMemoryInput {
  noteId: number;
}

export interface MemoryTarget {
  noteId?: number | null;
  sourceId?: number | null;
}
