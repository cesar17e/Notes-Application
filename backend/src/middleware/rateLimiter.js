import rateLimit from "express-rate-limit";

function createLimiter({ windowMs, max, message }) {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message },
    });
}

export const globalApiLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "Too many requests from this IP. Please try again later.",
});

export const authLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many auth requests. Please slow down.",
});

export const authWriteLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login or registration attempts. Please try again later.",
});

export const noteReadLimiter = createLimiter({
    windowMs: 5 * 60 * 1000,
    max: 30,
    message: "Too many note reads. Please wait a moment and try again.",
});

export const noteWriteLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many note changes. Please wait before trying again.",
});
