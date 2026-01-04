import { ClassProvider, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export function provideSerializerInterceptors(): ClassProvider {
    return {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor,
    };
}
