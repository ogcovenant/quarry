import { Module } from '@nestjs/common';
import { WalrusService } from './walrus.service';
import { SuiModule } from 'src/sui/sui.module';

@Module({
  imports: [SuiModule],
  providers: [WalrusService],
  exports: [WalrusService],
})
export class WalrusModule {}
