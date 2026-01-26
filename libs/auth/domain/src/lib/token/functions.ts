import { fromRawUserToDto } from '../user';
import { RefreshTokenBuilder } from './refresh-token.builder';
import { RefreshTokenDto } from './refresh-token.dto';

export function fromRawRefreshTokenToDto(raw: RefreshTokenDto) {
    return new RefreshTokenBuilder()
        .withId(raw.id)
        .withTokenHash(raw.tokenHash)
        .withFamilyId(raw.familyId)
        .isExpiredAt(raw.expiresAt)
        .isRevoked(raw.revoked)
        .belongsTo(fromRawUserToDto(raw.user))
        .build();
}
