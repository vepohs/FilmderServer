import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { MovieEntity } from './MovieEntity';
import {UserEntity} from "../../user/entities/UserEntity";

@Entity({ name: 'swipe' })
export class SwipeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserEntity, user => user.swipes)
    user!: UserEntity;

    @ManyToOne(() => MovieEntity, movie => movie.swipes)
    movie!: MovieEntity;

    @Column({ type: 'boolean', default: false })
    view!: boolean;

    @Column({ type: 'boolean', default: false })
    like!: boolean;
}
