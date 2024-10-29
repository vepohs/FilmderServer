import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RefreshToken} from "../../authentification/entities/refreshTokenEntity";

@Entity({ name: 'users' })
export class User{
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
    @OneToMany(() => RefreshToken, token => token.user)
    refreshTokens!: RefreshToken[];
}
