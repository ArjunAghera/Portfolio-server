import { Module } from '@nestjs/common';
import { WebProjectsModule } from './web-projects/web-projects.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WebProjectsModule,
    AuthModule,
    PrismaModule,
    AdminModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
