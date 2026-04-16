import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  imageUrl: string;

  @Column({ default: 'Electronics' })
  category: string;

  @Column({ default: 0 })
  stock: number;
}
