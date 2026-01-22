import { EnvironmentVariables, MAX_SERVER_PORT, MIN_SERVER_PORT } from '@dnd-mapp/backend-utils';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class Environment {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariables.AUTH_SERVER_HOST]?: string;

    @Max(MAX_SERVER_PORT)
    @Min(MIN_SERVER_PORT)
    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
    @IsOptional()
    [EnvironmentVariables.AUTH_SERVER_PORT]?: number;
}
