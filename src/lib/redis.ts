import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

export const getRedisClient = () =>{
    if(client){
        return client;
    }

    client = createClient({
        url: process.env.REDIS_URL
    });

    client.on("error", (err)=> console.error("Redis client errorr", err));

    return client
}