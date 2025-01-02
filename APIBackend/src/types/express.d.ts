import { UserDocument } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            loginResult?: {
                success: boolean;
                message: string;
                user?: UserDocument;
            };
        }
    }
}
