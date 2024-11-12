import {PayloadType} from "../../authentification/type/UserPayLoad";

interface AuthenticatedRequest extends Request {
    user: PayloadType;
}

const preferenceService = new PreferenceService();
export const preferenceGenre = async (req: AuthenticatedRequest, res: Response) => {
    const preference: number[] = req.body.genrePreference;
    preferenceService.updateGenrePreference(req.user.email, preference);
}