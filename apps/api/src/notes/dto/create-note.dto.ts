import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsUUID()
  projectId!: string;
}
