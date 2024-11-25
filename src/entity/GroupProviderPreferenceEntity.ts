import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {GroupEntity} from './GroupEntity';
import {ProviderEntity} from "./ProviderEntity";


@Entity({name: 'group_provider_preference'})
export class GroupProviderPreferenceEntity {
    @PrimaryColumn()
    groupId!: number;

    @PrimaryColumn()
    providerId!: number;

    @ManyToOne(() => GroupEntity, (group) => group.groupId, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'groupId'})
    group!: GroupEntity;

    @ManyToOne(() => ProviderEntity, (provider) => provider.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'providerId'})
    provider!: ProviderEntity;

}
