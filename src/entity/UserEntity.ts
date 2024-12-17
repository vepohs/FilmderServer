import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {RefreshTokenEntity} from "./refreshTokenEntity";
import {SwipeEntity} from "./SwipeEntity";
import {GroupEntity} from "./GroupEntity";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100})
    firstName!: string;

    @Column({type: 'varchar', length: 100})
    lastName!: string;

    @Column({type: 'varchar', length: 150, unique: true})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'varchar', length: 255, default: 'default/path/to/profile.jpg'})
    ppPath?: string;

    @Column({type: 'int'})
    age!: number;

    @OneToMany(() => GroupEntity, group => group.owner)
    ownedGroups!: GroupEntity[]

    @Column({type: 'int', default: 0})
    countryId?: number;

    @Column({ type: 'datetime', nullable: true })
    lastActivity?: Date;



    @OneToMany(() => RefreshTokenEntity, token => token.user)
    refreshTokens!: RefreshTokenEntity[];

    @OneToMany(() => SwipeEntity, swipes => swipes.user)
    swipes!: SwipeEntity[];
    @ManyToMany(() => GroupEntity, group => group.users)
    @JoinTable({
        name: 'JointureUserGroup',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'groupId', referencedColumnName: 'groupId' }
    })
    groups!: GroupEntity[];

}
