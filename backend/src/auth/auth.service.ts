import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    };
  }

  async validateOAuthUser(profile: any): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const email = emails[0].value;
    
    let user = await this.usersService.findByEmail(email);
    
    if (!user) {
      user = await this.usersService.create({
        googleId: id,
        username: email.split('@')[0],
        email: email,
        avatar: photos[0]?.value,
        role: UserRole.USER,
      });
    } else if (!user.googleId) {
      user = await this.usersService.update(user.id, { googleId: id, avatar: photos[0]?.value });
    }
    
    return user;
  }

  async register(registrationData: any): Promise<any> {
    const { username, email, password } = registrationData;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });
    const { password: _, ...result } = user;
    return result;
  }
}
