import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.users.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });

    delete user.password;
    return user;
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const valid = await argon.verify(user.password, dto.password);

    if (!valid) {
      throw new ForbiddenException('Invalid password');
    }

    return this.signinToken(user.id, user.email);
  }

  async signinToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return {
      accessToken: token,
    };
  }
}
