import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadSourceDto {
  @IsNotEmpty()
  @IsString()
  filename!: string;

  @IsOptional()
  @IsString()
  projectUuid?: string;

  @IsNotEmpty()
  @IsString()
  mimeType!: string;
}
