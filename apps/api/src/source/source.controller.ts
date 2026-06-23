import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { UploadSourceDto } from './dto/upload-source.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';

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

  @Get('/')
  async getAllSources(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.sourceService.getAllSources(user.id, query);
  }

  @Get('/:uuid')
  async getDownloadUrl(@Param('uuid') uuid: string, @CurrentUser() user: User) {
    return this.sourceService.getDownloadUrl(uuid, user.id);
  }

  @Delete('/:uuid')
  async deleteSource(
    @Param('uuid') uuid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.sourceService.deleteSource(uuid, user.id);
  }
}
