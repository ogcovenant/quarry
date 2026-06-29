import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MemoryService } from './memory.service';
import { Logger } from '@nestjs/common';
import { IndexMemoryQueueInput } from './memory.interface';
import { NotesService } from 'src/notes/notes.service';
import { SourceService } from 'src/source/source.service';

@Processor('memory')
export class MemoryProcessor extends WorkerHost {
  private readonly logger = new Logger('MemoryProcessor', { timestamp: true });

  constructor(
    private readonly memoryService: MemoryService,
    private readonly noteService: NotesService,
    private readonly sourceService: SourceService,
  ) {
    super();
  }

  async process(job: Job<IndexMemoryQueueInput>): Promise<void> {
    if (job.name !== 'index-memory') {
      return;
    }

    if (job.data.memoryType === 'source') {
      const source = await this.sourceService.fetchSourceById(
        job.data.sourceId,
      );

      if (!source) {
        return;
      }

      const content = await this.sourceService.extractContentFromSource(source);

      await this.memoryService.indexSource({
        content,
        userId: source.user.id,
        sourceId: source.id,
        projectId: source.project?.id,
      });

      return;
    }

    const note = await this.noteService.fetchNoteById(job.data.noteId);

    if (!note?.content) {
      return;
    }

    await this.memoryService.indexNote({
      content: note.content,
      userId: note.user.id,
      noteId: note.id,
      projectId: note.project?.id,
    });
  }

  @OnWorkerEvent('completed')
  onSuccess(job: Job) {
    this.logger.log(`[Memory Job] Id: ${job.id} Name: ${job.name} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    this.logger.error(
      `[Memory Job] Id: ${job.id} Name: ${job.name} failed`,
      job.failedReason,
    );
  }
}
