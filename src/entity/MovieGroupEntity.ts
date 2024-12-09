import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { MovieEntity } from './MovieEntity';
import {GroupEntity} from "./GroupEntity";

@Entity({ name: 'movieGroup' })
@Unique(['group', 'movie']) // Contrainte unique composite
export class MovieGroupEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GroupEntity, group => group.groupId)
    group!: GroupEntity;

    @ManyToOne(() => MovieEntity, movie => movie.id)
    movie!: MovieEntity;

    @Column({ type: 'boolean', default: false })
    liked!: boolean;
}
