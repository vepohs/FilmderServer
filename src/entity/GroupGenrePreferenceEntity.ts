import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { GroupEntity } from './GroupEntity';
import { GenreEntity } from './GenreEntity';

@Entity({ name: 'group_genre_preference' })
export class GroupGenrePreferenceEntity {
    @PrimaryColumn()
    groupId!: number;

    @PrimaryColumn()
    genreId!: number;

    @ManyToOne(() => GroupEntity, (group) => group.groupId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'groupId' })
    group!: GroupEntity;

    @ManyToOne(() => GenreEntity, (genre) => genre.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'genreId' })
    genre!: GenreEntity;

}
