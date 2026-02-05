import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { DmaJwtService } from '../jwt';
import { UserService } from '../user';

const JWT_BEARER = 'Bearer ';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly dmaJwtService: DmaJwtService;
    private readonly userService: UserService;

    public constructor(dmaJwtService: DmaJwtService, userService: UserService) {
        this.dmaJwtService = dmaJwtService;
        this.userService = userService;
    }

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const authHeader = request.headers.authorization;

        if (!authHeader) return false;
        if (!authHeader.startsWith(JWT_BEARER)) return false;
        const token = authHeader.replace(JWT_BEARER, '');

        const decoded = this.dmaJwtService.verify(token);
        const user = await this.userService.getById(decoded.sub);

        if (!user) throw new UnauthorizedException();
        request.user = user;

        return true;
    }
}
