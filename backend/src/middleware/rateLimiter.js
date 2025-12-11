import ratelimit from "../config/upstash.js";

//Per user if has an account, if not per ip
export default async function rateLimiter(req, res, next) {
    try {
        let identifier;

        // If user is authenticated --> rate limit by user ID
        if (req.user?.id) {
            identifier = `user_${req.user.id}`;
        } 
        else {
            // Before login/register --> rate limit by IP
            identifier =
                req.headers["x-forwarded-for"]?.split(",")[0] ||
                req.socket.remoteAddress;
        }

        const result = await ratelimit.limit(identifier);

        if (!result.success) {
            return res.status(429).json({
                message: "Too many requests. Please slow down.",
                retryAfter: result.reset
            });
        }

        next();

    } catch (err) {
        console.error("Rate limiter error:", err);
        // Fail-open so the app doesn't crash
        next();
    }
}
