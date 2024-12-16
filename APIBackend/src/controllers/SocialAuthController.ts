import { Request, Response } from 'express';
import { backEndUrl, frontEndUrl, strSocialLogin } from '../constants';
import { OAuth2Client } from 'google-auth-library';
import SocialAuth from '../models/SocialAuth';
import User, { UserDocument } from '../models/User';

import jwt from 'jsonwebtoken';

function tokenizeUser(user: UserDocument | null) {
    return jwt.sign({ userId: user?._id, email: user?.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
}

export const goolgeAuthRequest = async (req: Request, res: Response) => {
    res.header('Access-Control-Allowed-Origin', frontEndUrl);
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const state = req.query.state as string;
    const redirectUrl = `${backEndUrl}/oauth/google`;

    const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID_GG, process.env.CLIENT_SECRET_GG, redirectUrl);

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'openid',
        ].join(' '),
        prompt: 'consent',
        state: state,
    });

    res.json({ url: authorizeUrl });
};

async function getGoogleUserData(access_token: string | null | undefined) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const state = req.query.state as string;

        const redirectUrl = `${backEndUrl}/oauth/google`;
        const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID_GG, process.env.CLIENT_SECRET_GG, redirectUrl);
        const response = await oAuth2Client.getToken(code);

        oAuth2Client.setCredentials(response.tokens);
        console.log('Token acquired');

        const user = oAuth2Client.credentials;
        console.log('Credential', user);

        const userData = await getGoogleUserData(user.access_token);

        let socialAuth = await SocialAuth.findOne({ provider: 'google', providerId: userData.sub });

        if (!socialAuth) {
            const newUser = await User.create({
                email: userData.email,
                userName: userData.name,
                password: strSocialLogin,
            });

            socialAuth = await SocialAuth.create({
                provider: 'google',
                providerId: userData.sub,
                userId: newUser._id,
            });
        }
        const savedUser = await User.findById(socialAuth.userId);
        const token = tokenizeUser(savedUser);

        const redirectUrlWithToken = new URL(state);
        redirectUrlWithToken.searchParams.append('token', token);

        res.redirect(redirectUrlWithToken.toString());
    } catch (error) {
        console.error('Error with Google auth', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};
