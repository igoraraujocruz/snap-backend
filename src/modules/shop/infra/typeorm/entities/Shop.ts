import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

@Entity('shop')
export class Shop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    typeOfPayment: string;

    @Column()
    @Exclude()
    clientId: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Client, client => client.shop)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @Column()
    @Exclude()
    productId: string;

    @ManyToOne(() => Product, product => product.shop, {
        eager: true
    })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    @Exclude()
    userId: string;

    @ManyToOne(() => User, user => user.shop)
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude()
    deletedAt?: Date;
}
