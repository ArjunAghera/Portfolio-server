import { Module } from '@nestjs/common';
import { WebProjectsService } from './web-projects.service';
import { WebProjectsController } from './web-projects.controller';

@Module({
  providers: [WebProjectsService],
  controllers: [WebProjectsController],
})
export class WebProjectsModule {}
