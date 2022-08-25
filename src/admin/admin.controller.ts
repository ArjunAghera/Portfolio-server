import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { ExperienceDto, BlogDto, WebProjectsDto } from './dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/check')
  check() {
    return this.adminService.check();
  }

  @Post('/experience')
  addExperience(@Body() dto: ExperienceDto) {
    return this.adminService.addExperience(dto);
  }

  @Post('/blog')
  addBlog(@Body() dto: BlogDto) {
    return this.adminService.addBlog(dto);
  }

  @Post('/web-project')
  @UseInterceptors(FileInterceptor('file'))
  addWebProject(
    @Body() dto: WebProjectsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminService.addWebProject(dto, file);
  }

  @Post('/photography')
  @UseInterceptors(FileInterceptor('file'))
  addPhotography(@UploadedFile() file: Express.Multer.File) {
    return this.adminService.addPhotography(file);
  }
}
