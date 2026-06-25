import { Memory } from './entities/memory.entity';

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

export type MemoryType = 'source' | 'note';

export interface MemoryTarget {
  memoryType: MemoryType;
  noteId?: number | null;
  sourceId?: number | null;
}

export interface MemorySearchInput {
  userId: number;
  query: string;

  projectId?: number;
  noteId?: number;
  sourceId?: number;

  limit?: number;
  minimumSimilarity?: number;
}

export interface MemorySearchResult {
  chunk: Memory;
  similarity: number;
}
