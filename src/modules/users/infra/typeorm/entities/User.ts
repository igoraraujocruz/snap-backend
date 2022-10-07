import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { Permission } from './Permission';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @OneToMany(() => Product, product => product.user)
    products: Product[];

    @OneToMany(() => Shop, shop => shop.user)
    shop: Shop[];

    @ManyToMany(() => Permission, {
        eager: true
    })
    @JoinTable({
        name: "users_permissions",
        joinColumns: [{ name: "userId" }],
        inverseJoinColumns: [{ name: "permissionId" }],
    })
    permissions: Permission[];

    @Column()
    @Exclude()
    password: string;

    @Column()
    email: string;

    @Column()
    mobilePhone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude()
    deletedAt?: Date;
}
