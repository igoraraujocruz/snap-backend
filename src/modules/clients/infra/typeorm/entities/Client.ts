import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    neighborhood: string;

    @Column()
    points: number;

    @Column()
    email: string;

    @Column()
    mobilePhone: string;

    @Column()
    birthday: Date;

    @OneToMany(() => Shop, shop => shop.client, {
        eager: true,
    })
    shop: Shop[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude()
    deletedAt?: Date;
}
