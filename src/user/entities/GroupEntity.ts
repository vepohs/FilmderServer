import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, BeforeInsert } from 'typeorm';
import { GenreEntity } from "../../movie/entites/GenreEntity";
import { UserEntity } from "./UserEntity";

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
      this.groupId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
