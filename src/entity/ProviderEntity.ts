import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import {MovieEntity} from "./MovieEntity";

@Entity({ name: 'providers' })
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    logoPath?: string;

    @ManyToMany(() => MovieEntity, (movie) => movie.genres)
    movies!: MovieEntity[];
}
