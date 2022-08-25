import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExperienceDto, BlogDto, WebProjectsDto } from './dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  check() {
    return { msg: 'hello' };
  }

  async addExperience(dto: ExperienceDto) {
    const experience = await this.prisma.experience.create({
      data: {
        title: dto.title,
        company: dto.company,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });
    return experience;
  }

  async addBlog(dto: BlogDto) {
    const blog = await this.prisma.blog.create({
      data: {
        title: dto.title,
        blogLink: dto.blogLink,
      },
    });
    return blog;
  }

  async addWebProject(dto: WebProjectsDto, file: any) {
    let image: UploadApiResponse | UploadApiErrorResponse;
    if (file) {
      const upload = new Promise(async (_res, _rej) => {
        try {
          image = await this.cloudinary.uploadImage(file);
        } catch (e) {
          Error(e);
        }
      });
      await Promise.all([upload]);
    }
    const webProject = await this.prisma.webProjects.create({
      data: {
        name: dto.name,
        description: dto.description,
        url: dto.url,
        image: image.url,
      },
    });
    return webProject;
  }

  async addPhotography(file: any) {
    let image: UploadApiResponse | UploadApiErrorResponse;
    if (file) {
      image = await this.cloudinary.uploadImage(file);
    }
    const photography = await this.prisma.photography.create({
      data: {
        image: image.url,
      },
    });
    return photography;
  }

  async addPhotoshop(file: any) {
    let image: UploadApiResponse | UploadApiErrorResponse;
    if (file) {
      image = await this.cloudinary.uploadImage(file);
    }
    const photoshop = await this.prisma.photoshopArtwork.create({
      data: {
        image: image.url,
      },
    });
    return photoshop;
  }
}
