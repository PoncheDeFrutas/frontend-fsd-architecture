import type { Role, User } from "../model/types";
import type { MeDto, UserDto } from "./user.dto";

type UserDtoCompat = UserDto & {
    // Optional compatibility for future multi-role responses
    roles?: Role[];
};

function pickPrimaryRole(dto: UserDtoCompat): Role {
    if (dto.role) return dto.role;
    const first = dto.roles?.[0];
    if (first) return first;
    throw new Error("User role is missing from DTO");
}

export function userFromDto(dto: UserDtoCompat): User {
    return {
        id: dto.id,
        email: dto.email,
        role: pickPrimaryRole(dto),
        permissions: dto.permissions,
    };
}

export function meFromDto(dto: MeDto): { user: User } {
    return {
        user: userFromDto(dto.user),
    };
}
