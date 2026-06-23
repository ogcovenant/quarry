import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SourceService } from './source.service';
import { UploadSourceDto } from './dto/upload-source.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post('/upload')
  async getUploadUrl(
    @Body() body: UploadSourceDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.sourceService.getUploadUrl(body, user);
  }
}
