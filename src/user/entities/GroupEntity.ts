import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
import {GenreEntity} from "../../movie/entites/GenreEntity";
import {UserEntity} from "./UserEntity";

@Entity({name: 'groupe'})
export class GroupEntity {
    @PrimaryGeneratedColumn()
    groupId!: number;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'varchar', length: 255, default: 'default.jpg'})
    imagePath!: string;

    @ManyToOne(() => UserEntity, user => user.ownedGroups, { onDelete: 'CASCADE' })
    owner!: UserEntity;
    @ManyToMany(() => UserEntity, user => user.groups)
    users!: UserEntity[];

    // Relation Many-to-Many avec Genre via le tableau groupeGenre
    @ManyToMany(() => GenreEntity)
    @JoinTable({
        name: 'groupeGenre',
        joinColumn: {name: 'idGroupe', referencedColumnName: 'groupId'},
        inverseJoinColumn: {name: 'idGenre', referencedColumnName: 'id'}
    })
    genres!: GenreEntity[];
}
