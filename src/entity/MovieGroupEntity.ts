import { Entity, Column, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { MovieEntity } from './MovieEntity';
import { GroupEntity } from './GroupEntity';

@Entity({ name: 'movieGroup' })
@Unique(['group', 'movie']) // Contrainte unique composite
export class MovieGroupEntity {
    @PrimaryColumn() // Utiliser `PrimaryColumn` pour définir une clé primaire
    groupId!: number;

    @PrimaryColumn() // Utiliser `PrimaryColumn` pour définir une clé primaire
    movieId!: number;

    @ManyToOne(() => GroupEntity, group => group.groupId, { onDelete: 'CASCADE' })
    group!: GroupEntity;

    @ManyToOne(() => MovieEntity, movie => movie.id, { onDelete: 'CASCADE' })
    movie!: MovieEntity;

    @Column({ type: 'boolean', default: false })
    liked!: boolean;
}
