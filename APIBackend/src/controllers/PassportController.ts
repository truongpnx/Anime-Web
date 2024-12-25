import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import bcrypt from 'bcrypt';
import User from '../models/User';
import SocialAuth from '../models/SocialAuth';
import { isValidEmail } from '../helper/stringHelper';

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            if (!isValidEmail(email)) {
                return done(null, false, { message: 'Unauthorization' });
            }

            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: 'Unauthorization' });
            }

            const isMatch = await bcrypt.compare(password.toString(), user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Unauthorization' });
            }

            done(null, user);
        } catch (error) {
            done(error);
        }
    }),
);

async function socialCreateUser(
    provider: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
) {
    try {
        let socialAuth = await SocialAuth.findOne({ provider: provider, providerId: profile.id });

        let user;
        if (!socialAuth) {
            user = await User.create({
                email: profile.emails?.[0]?.value,
                userName: profile.displayName,
                password: process.env.SOCIAL_LOGIN_PASSWORD,
            });

            socialAuth = await SocialAuth.create({
                provider: provider,
                providerId: profile.id,
                userId: user._id,
            });
        } else {
            user = await User.findById(socialAuth.userId);
        }

        done(null, user || undefined);
    } catch (error) {
        done(error, undefined);
    }
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID_GG as string,
            clientSecret: process.env.CLIENT_SECRET_GG as string,
            callbackURL: '/oauth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            await socialCreateUser('google', profile, done);
        },
    ),
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            callbackURL: '/oauth/facebook/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            await socialCreateUser('facebook', profile, done);
        },
    ),
);

export default passport;
