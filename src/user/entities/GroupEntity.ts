import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, BeforeInsert } from 'typeorm';
import { GenreEntity } from "../../movie/entites/GenreEntity";
import { UserEntity } from "./UserEntity";
import { nanoid } from 'nanoid';
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

    @ManyToMany(() => GenreEntity)
    @JoinTable({
        name: 'groupeGenre',
        joinColumn: { name: 'idGroupe', referencedColumnName: 'groupId' },
        inverseJoinColumn: { name: 'idGenre', referencedColumnName: 'id' }
    })
    genres!: GenreEntity[];


    @BeforeInsert()
    generateGroupId() {
        this.groupId = nanoid(16); // Génère un identifiant unique de 8 caractères
    }
}
