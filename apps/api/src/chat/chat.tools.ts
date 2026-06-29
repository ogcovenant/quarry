import { z } from 'zod';
import { tool } from 'langchain';
import { ISearchMemoryToolInput } from './chat.interface';
import { appInstance } from 'src/main';
import { MemoryService } from 'src/memory/memory.service';

const memoryService = appInstance.get(MemoryService);

export const searchMemory = tool(
  ({ query, userId, noteId, projectId, sourceId }: ISearchMemoryToolInput) => {
    return memoryService.search({
      query,
      userId,
      noteId,
      projectId,
      sourceId,
      limit: 10,
      minimumSimilarity: 0.8,
    });
  },
  {
    name: 'search_memory',
    description:
      'Search through user memory to find context relevant to the current query',
    schema: z.object({
      query: z.string().describe('The search terms or context to look for'),
      userId: z.number().describe('The ID of the user owning the memory'),
      noteId: z
        .number()
        .optional()
        .describe('Optional ID to filter by a specific note'),
      projectId: z
        .number()
        .optional()
        .describe('Optional ID to filter by a specific project'),
      sourceId: z
        .number()
        .optional()
        .describe('Optional ID to filter by a data source'),
    }) as z.ZodType<ISearchMemoryToolInput>,
  },
);
