import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { MovieEntity } from './MovieEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'swipe' })
@Unique(['user', 'movie']) // Contrainte unique composite
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
    liked!: boolean;
}
