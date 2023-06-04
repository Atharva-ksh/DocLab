import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
passport.use(
	new GoogleStrategy(
		{
			clientID: "627285075121-oa9938qiq2nkkl25c0rgg1id77me5752.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default passport;