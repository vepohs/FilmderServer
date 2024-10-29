import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RefreshTokenEntity} from "../../authentification/entities/refreshTokenEntity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    firstName!: string;

    @Column({ type: 'varchar', length: 100 })
    lastName!: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'varchar', length: 255})
    ppPath?: string;

    @Column({ type: 'int'})
    age?: number;

    @Column({ type: 'int' })
    countryId?: number;

    @OneToMany(() => RefreshTokenEntity, token => token.user)
    refreshTokens!: RefreshTokenEntity[];
}
