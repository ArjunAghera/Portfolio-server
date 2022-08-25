import { IsNotEmpty, IsString } from 'class-validator';

export class WebProjectsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
