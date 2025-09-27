import { createClient } from "redis";

export const redisClient = createClient({
    // url: "redis://localhost:6379",
  url: "redis://redis:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
