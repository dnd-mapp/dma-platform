import { UserDto } from '@dnd-mapp/auth-domain';
import { RefreshTokenDto } from './refresh-token.dto';

export class RefreshTokenBuilder {
    private readonly refreshToken = new RefreshTokenDto();

    public build() {
        return this.refreshToken;
    }

    public withId(id: string) {
        this.refreshToken.id = id;
        return this;
    }

    public withTokenHash(hash: string) {
        this.refreshToken.tokenHash = hash;
        return this;
    }

    public isExpiredAt(timestamp: Date) {
        this.refreshToken.expiresAt = timestamp;
        return this;
    }

    public isRevoked(revoked: boolean) {
        this.refreshToken.revoked = revoked;
        return this;
    }

    public withFamilyId(familyId: string) {
        this.refreshToken.familyId = familyId;
        return this;
    }

    public belongsTo(user: UserDto) {
        this.refreshToken.user = user;
        return this;
    }
}
