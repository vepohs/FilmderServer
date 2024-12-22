import {MovieType, ProviderType, UserType} from "../type/Type";
import {MovieEntity} from "../entity/MovieEntity";
import {UserEntity} from "../entity/UserEntity";
import {SwipeEntity} from "../entity/SwipeEntity";
import {GroupEntity} from "../entity/GroupEntity";
import {GenreEntity} from "../entity/GenreEntity";
import {ProviderEntity} from "../entity/ProviderEntity";
import {GroupGenrePreferenceEntity} from "../entity/GroupGenrePreferenceEntity";
import {GroupProviderPreferenceEntity} from "../entity/GroupProviderPreferenceEntity";
import {SwipeMovieGroupEntity} from "../entity/SwipeMovieGroupEntity";
import {GenrePreferenceEntity} from "../entity/PreferenceGenreEntity";
import {PreferenceProviderEntity} from "../entity/PreferenceProviderEntity";

export class EntityFactory {

    createMovieEntity(movieData: MovieType): MovieEntity {
        const movie = new MovieEntity();
        movie.adult = movieData.adult;
        movie.genres = movieData.genres;
        movie.id = movieData.id;
        movie.title = movieData.title;
        movie.synopsis = movieData.synopsis;
        movie.releaseDate = movieData.releaseDate;
        movie.averageGrade = movieData.averageGrade;
        movie.votes = movieData.votes;
        movie.duration = movieData.duration;
        movie.imagePath = movieData.imagePath;
        movie.videoPath = movieData.videoPath;
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


    createSwipeMovieGroupEntity(group: GroupEntity, movie: MovieEntity, liked: boolean) {
        const swipeMovieGroupEntity = new SwipeMovieGroupEntity();
        swipeMovieGroupEntity.liked = liked;
        swipeMovieGroupEntity.group = group;
        swipeMovieGroupEntity.movie = movie;
        return swipeMovieGroupEntity
    }

    createGenrePreferenceEntity(genreId: number, user: UserEntity): GenrePreferenceEntity {
        const genreEntity = new GenreEntity();
        genreEntity.id = genreId;
        const genrePreferenceEntity = new GenrePreferenceEntity();
        genrePreferenceEntity.user = user;
        genrePreferenceEntity.genre = genreEntity;
        return genrePreferenceEntity;
    }

    createProviderPreferenceEntity(providerId: number, user: UserEntity): PreferenceProviderEntity {
        const providerEntity = new ProviderEntity();
        providerEntity.id = providerId;
        const providerPreferenceEntity = new PreferenceProviderEntity();
        providerPreferenceEntity.user = user;
        providerPreferenceEntity.provider = providerEntity;
        return providerPreferenceEntity;
    }

    createUserEntity(userData: UserType): UserEntity {
        const user = new UserEntity();
        user.lastActivity = new Date();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.password = userData.password;
        user.age = userData.age;
        return user;
    }
}