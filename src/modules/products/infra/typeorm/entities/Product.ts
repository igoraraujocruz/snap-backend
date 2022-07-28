import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { Photo } from '@modules/photos/infra/typeorm/entities/Photo';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    slug: string;

    @OneToMany(() => Photo, photos => photos.product, {
        eager: true,
    })
    photos: Photo[];

    @Column({ type: 'real' })
    price: string;

    @Column({ type: 'real' })
    creditPoints: string;

    @Column({ type: 'real' })
    debitPoints: string;

    @Column()
    @Exclude()
    userId: string;

    @ManyToOne(() => User, {
        eager: true,
    })
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
