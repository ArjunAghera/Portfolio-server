import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WebProjectsService {
  constructor(private prisma: PrismaService) {}
  async getWebProjects() {
    const projects = await this.prisma.webProjects.findMany();
    return projects;
  }
}
