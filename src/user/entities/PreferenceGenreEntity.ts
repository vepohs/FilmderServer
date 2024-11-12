import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {UserEntity} from "./UserEntity";
import {GenreEntity} from "../../movie/entites/GenreEntity";


@Entity({ name: 'genre_preferences' })
export class GenrePreferenceEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE' })
    user!: UserEntity;

    @ManyToOne(() => GenreEntity, genre => genre.id, { onDelete: 'CASCADE' })
    genre!: GenreEntity;
}
