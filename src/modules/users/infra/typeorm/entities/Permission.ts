import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
