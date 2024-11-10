import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import {MovieEntity} from "./MovieEntity";


@Entity({ name: 'genres' })
export class GenreEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imagePath?: string;

    // Relation Many-to-Many avec les films
    @ManyToMany(() => MovieEntity, movie => movie.genres)
    movies!: MovieEntity[];
}
