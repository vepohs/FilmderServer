import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { MovieEntity } from './MovieEntity';
import {UserEntity} from "../../user/entities/UserEntity";

@Entity({ name: 'history' })
export class HistoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserEntity, user => user.histories)
    user!: UserEntity;

    @ManyToOne(() => MovieEntity, movie => movie.histories)
    movie!: MovieEntity;

    @Column({ type: 'boolean', default: false })
    view!: boolean;

    @Column({ type: 'boolean', default: false })
    like!: boolean;
}
