import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { ProviderEntity } from './ProviderEntity';

@Entity({ name: 'provider_preferences' })
export class PreferenceProviderEntity {
    @PrimaryColumn()
    userId!: number;

    @PrimaryColumn()
    providerId!: number;

    @ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE' })
    user!: UserEntity;

    @ManyToOne(() => ProviderEntity, provider => provider.id, { onDelete: 'CASCADE' })
    provider!: ProviderEntity;
}
