import {GenreEntity} from "../entites/GenreEntity";
import {ProviderEntity} from "../entites/ProviderEntity";

export type MovieType= {
    adult: boolean;
    genres: GenreEntity[];
    id: number;
    title: string;
    synopsis: string;
    releaseDate: Date;
    averageGrade: number;
    votes   : number;
    duration: number;
    imagePath: string;
    providers: ProviderEntity[];
}