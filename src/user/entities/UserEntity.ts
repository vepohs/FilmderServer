import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {RefreshTokenEntity} from "../../authentification/entities/refreshTokenEntity";
import {HistoryEntity} from "../../movie/entites/HistoryEntity";
import {GenreEntity} from "../../movie/entites/GenreEntity";
//import {RewatchPreferenceEntity} from "./RewatchPreferenceEntity";

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
    age?: number;

    @Column({type: 'int', default: 0})
    countryId?: number;

    @OneToMany(() => RefreshTokenEntity, token => token.user)
    refreshTokens!: RefreshTokenEntity[];

    @OneToMany(() => HistoryEntity, history => history.user)
    histories!: HistoryEntity[];

    // Relation Many-to-Many avec GenreEntity


    //@OneToMany(() => RewatchPreferenceEntity, (preference) => preference.user)
//    rewatchPreferences!: RewatchPreferenceEntity[];
}
