import {ProviderEntity} from "../../movie/entites/ProviderEntity";
import {ProviderRepository} from "../repository/providerRepository";
import axios from "axios";
import {ProviderType} from "../type/providerType";
import {MovieType} from "../../movie/type/movieType";


export class ProviderService {
    private providerRepository: ProviderRepository;

    constructor() {
        this.providerRepository = new ProviderRepository();
    }


    async getProvidersByTMDB() {
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
    }

    async getBestProvider() {
        const numberOfBestProvider = 10;
        const providers = await this.getProvidersByTMDB();
        const bestProviders = providers
            .filter((provider: any) => provider.display_priorities?.BE !== undefined)
            .sort((a: any, b: any) => a.display_priorities.BE - b.display_priorities.BE);
        return bestProviders.slice(0, numberOfBestProvider);
    }

    async saveBestProviders(): Promise<ProviderEntity[]> {
        const bestProviderData = await this.getBestProvider()
        const providerList = bestProviderData.map((providerData: any) => this.createProvider(providerData))
        return Promise.all(providerList.map((provider: ProviderEntity) => this.providerRepository.saveProvider(provider)));
    }

    createProvider(providerData: ProviderType): ProviderEntity {
        const providerEntity = new ProviderEntity();
        providerEntity.id = providerData.provider_id
        providerEntity.logoPath = providerData.logo_path
        providerEntity.name = providerData.provider_name
        return providerEntity
    }

    async fetchProvidersFromTMDB(movieId: number) {
        const BaseUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;

        const response = await axios.get(BaseUrl, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        return response.data.results.BE;
    }

    async getAllProviderData(movie: any): Promise<ProviderType[]> {
        const providers = await this.fetchProvidersFromTMDB(movie.id);
        const allProvidersInDB = await this.providerRepository.getAllProviderId();
        const allProviders = [
            ...(providers.buy || []),
            ...(providers.rent || []),
            ...(providers.flatrate || [])
        ];

        const filteredProviders = allProviders.filter((provider: any) =>
            allProvidersInDB.includes(provider.provider_id)
        );

        return filteredProviders.filter((provider, index, self) =>
            index === self.findIndex((p) => p.provider_id === provider.provider_id)
        );
    }

    async getProvidersForMovie(movieData: any): Promise<ProviderEntity[]> {
        const providers = await this.getAllProviderData(movieData)
        const test =providers.map((provider: ProviderType) => this.createProvider(provider))
        return test
    }

    async getProvider() {
        return await this.providerRepository.getAllProvider();
    }
}