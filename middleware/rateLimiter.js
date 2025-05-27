import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 7,
  message: {
    status: 429,
    message: "Too many attempts, please try again later.",
  },
});
