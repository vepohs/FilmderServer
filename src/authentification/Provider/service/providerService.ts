import {ProviderEntity} from "../../../movie/entites/ProviderEntity";
import {ProviderRepository} from "../repository/providerRepository";

export class ProviderService {
    private providerRepository: ProviderRepository;

    constructor() {
        this.providerRepository = new ProviderRepository();
    }

    async getProvidersByFilmId(id: number): Promise<ProviderEntity[] | null> {
        return await this.providerRepository.getProvidersByIFilmd(id);
    }

}