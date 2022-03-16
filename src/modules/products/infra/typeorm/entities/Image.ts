import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import { Product } from './Product';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    @Exclude()
    productId: string;

    @ManyToOne(() => Product, {
        eager: true,
    })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Expose({ name: 'imageUrl' })
    getImagesUrl(): string | null {
        if (!this.imageUrl) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.imageUrl}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.imageUrl}`;
            default:
                return null;
        }
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
