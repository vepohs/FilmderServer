import {ProviderEntity} from "../../entity/ProviderEntity";
import {ProviderRepository} from "../../repository/provider/providerRepository";
import axios from "axios";
import {ProviderType} from "../../type/Type";
import {
    FailedToFetchProviderError,
    FailedToGetProviderError,
    FailedToSaveProviderError, NoProviderFoundError
} from "../../error/providerError";
import {createEntityFactory} from "../../factories/ClassFactory";

export class ProviderService {

    constructor(private readonly providerRepository: ProviderRepository) {
    }

    private readonly factory = createEntityFactory()

    createProviderEntity = (providerData: ProviderType): ProviderEntity => this.factory.createProviderEntity(providerData)
    saveBestProvider = (provider: ProviderEntity) => this.providerRepository.saveProvider(provider)
    getProviderId = (provider: ProviderEntity) => provider.id

    async getProvidersByTMDB() {
        try {
            const BaseUrl = 'https://api.themoviedb.org/3/watch/providers/movie';
            const response = await axios.get(`${BaseUrl}`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                },
                params: {
                    language: 'fr-FR',
                    watch_region: 'BE'
                }
            });
            return response.data.results;
        } catch {
            throw new FailedToGetProviderError();
        }
    }

    async getBestProvider() {
        try {
            const numberOfBestProvider = 10;
            const providers = await this.getProvidersByTMDB();
            const bestProviders = providers
                .filter((provider: any) => provider.display_priorities?.BE !== undefined)
                .sort((a: any, b: any) => a.display_priorities.BE - b.display_priorities.BE);
            return bestProviders.slice(0, numberOfBestProvider);
        } catch {
            throw new FailedToGetProviderError();
        }
    }

    async saveBestProviders(): Promise<ProviderEntity[]> {
        try {
            const bestProviderData = await this.getBestProvider()
            const providerList = bestProviderData.map(this.createProviderEntity)
            return Promise.all(providerList.map(this.saveBestProvider));
        } catch {
            throw new FailedToSaveProviderError();
        }
    }


    async fetchProvidersFromTMDB(movieId: number) {
        try {
            const BaseUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;

            const response = await axios.get(BaseUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                }
            });
            return response.data.results.BE;
        } catch {
            throw new FailedToFetchProviderError();
        }
    }

    async getAllProviderData(movie: any): Promise<ProviderType[]> {
        try {
            //todo peut mieux faire ()=> et l'error
            const providers = await this.fetchProvidersFromTMDB(movie.id);
            const allProvidersInDB = await this.providerRepository.getAllProvider();
            const allProvidersIdsInDB = allProvidersInDB.map(this.getProviderId);
            const allProviders = [
                ...(providers?.buy || []),
                ...(providers?.rent || []),
                ...(providers?.flatrate || [])
            ];

            const filteredProviders = allProviders.filter((provider: any) =>
                allProvidersIdsInDB.includes(provider.provider_id)
            );

            return filteredProviders.filter((provider, index, self) =>
                index === self.findIndex((p) => p.provider_id === provider.provider_id)
            );
        } catch {
            throw new FailedToFetchProviderError();
        }
    }

    async getProvidersForMovie(movieData: any): Promise<ProviderEntity[]> {
        try {
            const providersData = await this.getAllProviderData(movieData)
            const providers = providersData.map(this.createProviderEntity)
            return providers
        } catch {
            throw new FailedToGetProviderError();
        }
    }

    async getAllProvider() {

        const providers = await this.providerRepository.getAllProvider();
        if (providers.length === 0) throw new NoProviderFoundError();
        return providers;
    }

    async getProviderById(providerId: number) {
        const provider = await this.providerRepository.getProviderById(providerId);
        if (!provider) throw new NoProviderFoundError();
        return provider;
    }

}