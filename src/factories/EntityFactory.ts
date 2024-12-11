import {MovieType, ProviderType} from "../type/Type";
import {MovieEntity} from "../entity/MovieEntity";
import {UserEntity} from "../entity/UserEntity";
import {SwipeEntity} from "../entity/SwipeEntity";
import {GroupEntity} from "../entity/GroupEntity";
import {GenreEntity} from "../entity/GenreEntity";
import {ProviderEntity} from "../entity/ProviderEntity";
import {GroupGenrePreferenceEntity} from "../entity/GroupGenrePreferenceEntity";
import {GroupProviderPreferenceEntity} from "../entity/GroupProviderPreferenceEntity";

export class EntityFactory {

    isStringValid(input: string): boolean {
        const validCharactersRegex = /^[a-zA-Z0-9\s.,!?'"()\-:;]+$/;
        return validCharactersRegex.test(input);
    }

    cleanString(input: string): string {
        const text = input.replace(/[\u200B-\u200D\uFEFF]/g, '');
        if (this.isStringValid(text)) return text;
        else return 'No synopsis available';
    }

    createMovieEntity(movieData: MovieType): MovieEntity {
        const movie = new MovieEntity();
        movie.adult = movieData.adult;
        movie.genres = movieData.genres;
        movie.id = movieData.id;
        movie.title = this.cleanString(movieData.title);
        movie.synopsis = this.cleanString(movieData.synopsis);
        movie.releaseDate = movieData.releaseDate;
        movie.averageGrade = movieData.averageGrade;
        movie.votes = movieData.votes;
        movie.duration = movieData.duration;
        movie.imagePath = movieData.imagePath;
        movie.providers = movieData.providers;
        return movie;
    }

    createSwipeEntity(user: UserEntity, movie: MovieEntity, liked: boolean): SwipeEntity {
        const swipe = new SwipeEntity();
        swipe.user = user;
        swipe.movie = movie;
        swipe.liked = liked;
        return swipe;
    }

    createGroupEntity(userEntity: UserEntity, groupName: string): GroupEntity {
        const groupEntity = new GroupEntity();
        groupEntity.name = groupName;
        groupEntity.owner = userEntity;
        groupEntity.users = [userEntity];
        return groupEntity;
    }

    createGenreEntity(genreData: any): GenreEntity {
        const genre = new GenreEntity();
        genre.id = genreData.id;
        genre.name = genreData.name;
        genre.imagePath = 'default.jpg';
        return genre;
    }

    createProviderEntity(providerData: ProviderType): ProviderEntity {
        const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
        const providerEntity = new ProviderEntity();
        providerEntity.id = providerData.provider_id
        providerEntity.logoPath = BASE_IMAGE_URL + providerData.logo_path
        providerEntity.name = providerData.provider_name
        return providerEntity
    }

    createGroupGenrePreferenceEntity(groupId: string, genreId: number): GroupGenrePreferenceEntity {
        const groupGenrePreferenceEntity = new GroupGenrePreferenceEntity();
        groupGenrePreferenceEntity.groupId = groupId;
        groupGenrePreferenceEntity.genreId = genreId;
        return groupGenrePreferenceEntity;
    }

    createGroupProviderPreferenceEntity(groupId: string, providerId: number): GroupProviderPreferenceEntity {
        const groupProviderPreferenceEntity = new GroupProviderPreferenceEntity();
        groupProviderPreferenceEntity.groupId = groupId;
        groupProviderPreferenceEntity.providerId = providerId;
        return groupProviderPreferenceEntity;
    }

}