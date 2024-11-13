import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { GenreEntity } from '../../movie/entites/GenreEntity';

@Entity({ name: 'genre_preferences' })
export class GenrePreferenceEntity {
    @PrimaryColumn()
    userId!: number;

    @PrimaryColumn()
    genreId!: number;

    @ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE' })
    user!: UserEntity;

    @ManyToOne(() => GenreEntity, genre => genre.id, { onDelete: 'CASCADE' })
    genre!: GenreEntity;
}
