import {UserRepository} from "../repository/user/userRepository";
import {UserService} from "../Service/user/userService";
import AppDataSource from "../dataBase/dataSource";
import {UserEntity} from "../entity/UserEntity";
import {TokenRepository} from "../repository/authentification/tokenRepository";
import {RefreshTokenEntity} from "../entity/refreshTokenEntity";
import {TokenService} from "../Service/authentification/tokenService";
import {SwipeEntity} from "../entity/SwipeEntity";
import {SwipeRepository} from "../repository/swipe/swipeRepository";
import {SwipeService} from "../Service/swipe/swipeService";
import {EntityFactory} from "./entityFactory";
import {MovieEntity} from "../entity/MovieEntity";
import {MovieRepository} from "../repository/movie/movieRepository";
import {MovieServices} from "../Service/movie/movieServices";
import {GenreEntity} from "../entity/GenreEntity";
import {GenreService} from "../Service/genre/genreServices";
import {GenreRepository} from "../repository/genre/genreRepository";
import {ProviderRepository} from "../repository/provider/providerRepository";
import {ProviderEntity} from "../entity/ProviderEntity";
import {ProviderService} from "../Service/provider/providerService";
import {GroupRepository} from "../repository/group/groupRepository";
import {GroupEntity} from "../entity/GroupEntity";
import {GroupGenrePreferenceEntity} from "../entity/GroupGenrePreferenceEntity";
import {GroupProviderPreferenceEntity} from "../entity/GroupProviderPreferenceEntity";
import {GroupService} from "../Service/group/groupService";
import {PreferenceService} from "../Service/preference/preferenceService";
import {PreferenceRepository} from "../repository/preference/preferenceRepository";
import {GenrePreferenceEntity} from "../entity/PreferenceGenreEntity";
import {PreferenceProviderEntity} from "../entity/PreferenceProviderEntity";
import {SwipeMovieGroupRepository} from "../repository/group/swipeMovieGroupRepository";
import {SwipeMovieGroupEntity} from "../entity/SwipeMovieGroupEntity";
import {SwipeMovieGroupService} from "../Service/group/swipeMovieGroupService";

export function createEntityFactory() {
    return new EntityFactory();
}

export function createUserService(): UserService {
    return new UserService(createUserRepository());
}

export function createUserRepository(): UserRepository {
    return new UserRepository(AppDataSource.getRepository(UserEntity));
}

export function createTokenService(): TokenService {
    return new TokenService(createTokenRepository())
}

export function createTokenRepository(): TokenRepository {
    return new TokenRepository(AppDataSource.getRepository(RefreshTokenEntity));
}

export function createSwipeService(): SwipeService {
    return new SwipeService(createSwipeRepository());
}

export function createSwipeRepository(): SwipeRepository {
    return new SwipeRepository(AppDataSource.getRepository(SwipeEntity));
}

export function createMovieService(): MovieServices {
    return new MovieServices(createMovieRepository());
}

export function createMovieRepository(): MovieRepository {
    return new MovieRepository(AppDataSource.getRepository(MovieEntity));
}

export function createGenreService(): GenreService {
    return new GenreService(createGenreRepository());
}

export function createGenreRepository(): GenreRepository {
    return new GenreRepository(AppDataSource.getRepository(GenreEntity));
}

export function createProviderService(): ProviderService {
    return new ProviderService(createProviderRepository());
}

export function createProviderRepository(): ProviderRepository {
    return new ProviderRepository(AppDataSource.getRepository(ProviderEntity));
}

export function createGroupService(): GroupService {
    return new GroupService(createGroupRepository());
}

export function createGroupRepository(): GroupRepository {
    return new GroupRepository(AppDataSource.getRepository(GroupEntity), AppDataSource.getRepository(GroupGenrePreferenceEntity), AppDataSource.getRepository(GroupProviderPreferenceEntity));
}

export function createPreferenceRepository(): PreferenceRepository {
    return new PreferenceRepository(AppDataSource.getRepository(GenrePreferenceEntity), AppDataSource.getRepository(PreferenceProviderEntity))
}

export function createPreferenceService(): PreferenceService {
    return new PreferenceService(createPreferenceRepository())
}
export function createSwipeMovieGroupService():SwipeMovieGroupService {
    return new SwipeMovieGroupService(createSwipeMovieGroupRepository());
}
export function createSwipeMovieGroupRepository():SwipeMovieGroupRepository {
    return new SwipeMovieGroupRepository(AppDataSource.getRepository(SwipeMovieGroupEntity));
}
