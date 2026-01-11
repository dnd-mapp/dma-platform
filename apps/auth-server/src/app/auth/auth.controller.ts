import { AuthorizeQueryParamsDto, LoginDto } from '@dnd-mapp/auth/domain';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
    @Get('/authorize')
    public async authorize(@Query() queryParams: AuthorizeQueryParamsDto) {
        // TODO - Persist code challenge and state so that they can be verified later
        console.log({ queryParams });

        return {
            // TODO - Retrieve URL from registered Auth Client
            url: 'https://localhost.auth.dndmapp.dev:4300?loginChallenge=my-login-challenge',
        };
    }

    @Post('/login')
    public async login(@Body() data: LoginDto) {
        // TODO - Validate credentials, if valid -> generate auth code
        console.log({ data });

        // TODO - Add authorization code and state as query params
        return {
            url: 'https://localhost.admin.dndmapp.dev:4400?state=my-state&authorizationCode=my-authorization-code',
        };
    }
}
