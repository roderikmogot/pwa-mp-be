require('dotenv').config();

import express from '@fastify/express';
import Fastify, { FastifyInstance } from 'fastify';

import * as db from "./db/pwa.database";

export const server: FastifyInstance = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
                colorize: true,
            },
        },
    }
})

const start = async () => {
    try {
        await server.register(express);

        server.use(require('cors')())
        server.use(require('dns-prefetch-control')())
        server.use(require('helmet')())
        server.use(require('frameguard')())
        server.use(require('hsts')())
        server.use(require('ienoopen')())
        server.use(require('x-xss-protection')())

        server.register(require('./routes/recipes.get.route'), { prefix: '/api/v1' })
        server.register(require('./routes/recipes.post.route'), { prefix: '/api/v1' })

        await server.listen({ port: 8080 })

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

        console.log(`Server is listening on port ${port}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const stop = async () => {
    try {
        await server.close()
        db.closeConnection()
        console.log('Server has been closed')
    } catch (err) {
        console.log(err)
        server.log.error(err)
        process.exit(1)
    }
}

start()

process.on('SIGINT', async () => {
    await stop()
    process.exit(0)
})
