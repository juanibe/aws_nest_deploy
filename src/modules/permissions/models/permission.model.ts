import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Aplication } from 'src/modules/aplications/models/aplication.model';
import { Ecommerce } from 'src/modules/ecommerces/models/ecommerce.model';

@ObjectType()
@Entity()
export class Permission extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Aplication, {
    cascade: true,
    eager: true
  })
  aplication: Aplication;

  @Field()
  @ManyToOne(() => Ecommerce, {
    cascade: true,
    eager: true
  })
  ecommerce: Ecommerce;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
