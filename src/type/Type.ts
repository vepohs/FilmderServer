
import {GenreEntity} from "../entity/GenreEntity";
import {ProviderEntity} from "../entity/ProviderEntity";

export type Type = {
    password: string
    email: string
};

export type MovieType = {
    adult: boolean;
    genres: GenreEntity[];
    id: number;
    title: string;
    synopsis: string;
    releaseDate: Date;
    averageGrade: number;
    votes: number;
    duration: number;
    imagePath: string;
    providers: ProviderEntity[];
}
export type ProviderType = {
    provider_id: number,
    provider_name: string,
    logo_path: string,
}
export type UserPayloadType = {
    email: string
    userId: number
}
export type UserType = {
 firstName: string;
 lastName: string;
 email: string;
 age: number;
 password:string,
 confirmPassword:string
 countryId?: number;
 ppPath?: string; // Propriété optionnelle
};
