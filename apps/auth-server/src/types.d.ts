import { User } from '@dnd-mapp/auth-domain';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
    }
}
