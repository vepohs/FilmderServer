import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {HistoryEntity} from './HistoryEntity';
import {GenreEntity} from "./GenreEntity";
import {ProviderEntity} from "./ProviderEntity";


@Entity({name: 'movies'})
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 255})
    title!: string;

    @Column({type: 'varchar', length: 255,default: 'default.jpg'})
    imagePath!: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    synopsis?: string;

    @Column({type: 'date', nullable: true})
    releaseDate?: Date;

    @Column({type: 'float', default: 0})
    averageGrade!: number;

    @Column({type: 'boolean', default: true})
    adult!: boolean;

    @Column({type: 'int', default: 0})

    votes!: number;
    @Column({type: 'int', default: 0})
    duration!: number;

    @OneToMany(() => HistoryEntity, history => history.movie)
    histories!: HistoryEntity[];

    @ManyToMany(() => GenreEntity, genre => genre.movies)
    @JoinTable({
        name: 'jointuresMovieGenre',
        joinColumn: {name: 'movieId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'genreId', referencedColumnName: 'id'}
    })
    genres!: GenreEntity[];
    @ManyToMany(() => ProviderEntity, provider => provider.movies)
    @JoinTable({
        name: 'movie_providers',
        joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'provider_id', referencedColumnName: 'id' }
    })
    providers!: ProviderEntity[];
}
