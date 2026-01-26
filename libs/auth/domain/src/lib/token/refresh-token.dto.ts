import { selectUserProperties, UserDto } from '@dnd-mapp/auth-domain';

export const selectRefreshTokenProperties = {
    id: true,
    tokenHash: true,
    expiresAt: true,
    revoked: true,
    familyId: true,
    user: {
        select: selectUserProperties,
    },
};

export class RefreshTokenDto {
    public id!: string;
    public tokenHash!: string;
    public expiresAt!: Date;
    public revoked!: boolean;
    public familyId!: string;
    public user!: UserDto;
}

export class CreateRefreshTokenDto {
    public tokenHash!: string;
    public expiresAt!: Date;
    public userId!: string;
    public familyId?: string;
}
