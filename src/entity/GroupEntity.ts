import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, BeforeInsert, OneToMany} from 'typeorm';
import { GenreEntity } from "./GenreEntity";
import { UserEntity } from "./UserEntity";
import {MovieGroupEntity} from "./MovieGroupEntity";


@Entity({ name: 'groupe' })
export class GroupEntity {
    @PrimaryColumn()
    groupId!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255, default: 'default.jpg' })
    imagePath!: string;

    @ManyToOne(() => UserEntity, user => user.ownedGroups, { onDelete: 'CASCADE' })
    owner!: UserEntity;

    @ManyToMany(() => UserEntity, user => user.groups)
    users!: UserEntity[];
    @OneToMany (() => MovieGroupEntity, groupMovie => groupMovie.group)
    groupMovies!: MovieGroupEntity[];


    @BeforeInsert()
    generateGroupId() {
      this.groupId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
