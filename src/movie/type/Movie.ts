export class Movie {
    private title: string;
    private releaseDate: Date;
    private duration: number;
    private synopsis: string;

     imagePath: string;
    private genres: string[];
    private averageGrade: number;
    private votes: number;
    private adult: boolean;

    constructor(
        title: string,
        releaseDate: Date,
        duration: number,
        synopsis: string,
        imagePath: string,
        genres: string[],
        averageGrade: number,
        votes: number,
        adult: boolean
    ) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.duration = duration;
        this.synopsis = synopsis;
        this.imagePath = imagePath;
        this.genres = genres;
        this.averageGrade = averageGrade;
        this.votes = votes;
        this.adult = adult;
    }


    public getTitle(): string {
        return this.title;
    }

    public getReleaseDate(): Date {
        return this.releaseDate;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getSynopsis(): string {
        return this.synopsis;
    }

    public getImagePath(): string {
        return this.imagePath;
    }

    public getGenres(): string[] {
        return this.genres;
    }

    public getAverageGrade(): number {
        return this.averageGrade;
    }

    public getVotes(): number {
        return this.votes;
    }

    public isAdult(): boolean {
        return this.adult;
    }

}
