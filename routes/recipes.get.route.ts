import { FastifyInstance, RouteShorthandOptions } from "fastify";

import * as db from "../db/pwa.database";

export default function (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) {
    server.get('/recipes', async (request, reply) => {
        const query = `select * from recipes`;
        const rows = await db.query(query, []);
        return { rows };
    })

    done();
};
