import { Controller, Get } from '@nestjs/common';
import { WebProjectsService } from './web-projects.service';

@Controller('web-projects')
export class WebProjectsController {
  constructor(private projectService: WebProjectsService) {}

  @Get()
  getWebProjects() {
    return this.projectService.getWebProjects();
  }
}
