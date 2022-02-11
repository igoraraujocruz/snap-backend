import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToMany,
} from 'typeorm';
import { User } from './User';

@Entity('usersTokens')
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refreshToken: string;

    @Column()
    userId: string;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    expiresDate: Date;

    @CreateDateColumn()
    createdAt: Date;
}
