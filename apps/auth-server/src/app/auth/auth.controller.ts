import { AuthorizeQueryParamsDto } from '@dnd-mapp/auth/domain';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
    @Get('/authorize')
    public async authorize(@Query() queryParams: AuthorizeQueryParamsDto) {
        // TODO - Persist code challenge and state so that they can be verified later
        console.log({ queryParams });

        return {
            // TODO - Retrieve URL from registered Auth Client
            url: 'https://localhost.auth.dndmapp.dev:4300',
        };
    }
}
