import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MemoryModule } from 'src/memory/memory.module';

@Module({
  imports: [MemoryModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
