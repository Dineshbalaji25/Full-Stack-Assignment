import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async seed() {
    // 1. Seed Users
    const adminUser = await this.usersService.findByUsername('admin');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.usersService.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@example.com',
        role: UserRole.ADMIN,
      });
      console.log('Admin user seeded');
    }

    const regularUser = await this.usersService.findByUsername('user');
    if (!regularUser) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      await this.usersService.create({
        username: 'user',
        password: hashedPassword,
        email: 'user@example.com',
        role: UserRole.USER,
      });
      console.log('Regular user seeded');
    }

    // 2. Seed Products
    const products = await this.productsService.findAll();
    if (products.length === 0) {
      const dummyProducts = [
        {
          name: 'iPhone 15 Pro',
          description: 'The latest iPhone with Titanium design.',
          price: 999.00,
          imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
          category: 'Electronics',
          stock: 50,
        },
        {
          name: 'MacBook Air M2',
          description: 'Thin and light with the power of M2 chip.',
          price: 1199.00,
          imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
          category: 'Electronics',
          stock: 30,
        },
        {
          name: 'Sony WH-1000XM5',
          description: 'Industry-leading noise canceling headphones.',
          price: 349.00,
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
          category: 'Audio',
          stock: 100,
        },
        {
          name: 'Kindle Paperwhite',
          description: 'Purpose-built for reading.',
          price: 139.00,
          imageUrl: 'https://images.unsplash.com/photo-1594980596247-87c52aeb4382?auto=format&fit=crop&q=80&w=800',
          category: 'Electronics',
          stock: 200,
        }
      ];

      for (const p of dummyProducts) {
        await this.productsService.create(p);
      }
      console.log('Dummy products seeded');
    }
  }
}
