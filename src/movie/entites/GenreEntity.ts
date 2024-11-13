import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import {MovieEntity} from "./MovieEntity";

@Entity({ name: 'genres' })
export class GenreEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imagePath?: string;

    @ManyToMany(() => MovieEntity, (movie) => movie.providers)
    movies!: MovieEntity[];
}
