import { FastifyInstance, RouteShorthandOptions } from "fastify";

import * as db from "../db/pwa.database";
import { RecipeRequestBody } from "../types/index.type";

export default function (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) {
    server.post<{ Body: RecipeRequestBody }>('/recipes:add', opts, async (request, reply) => {
        const query = `INSERT INTO recipes (title, description) VALUES (?, ?)`;
        const binds = [request.body.name, request.body.description];
        const rows = await db.query(query, binds);
        return { rows };
    })

    done();
};
