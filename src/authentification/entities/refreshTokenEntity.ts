import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/userEntity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    token!: string;

    @Column({ type: 'timestamp' })
    expiresAt!: Date;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @ManyToOne(() => User, user => user.refreshTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;
}
