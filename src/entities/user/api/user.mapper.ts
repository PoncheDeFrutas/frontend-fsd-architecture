import type { Role, User } from "../model/types";
import type { MeDto, UserDto } from "./user.dto";

/**
 * Maps a User Data Transfer Object (DTO) to a User domain model.
 * @param dto - The User DTO to be mapped.
 * @return The corresponding User domain model.
 */
type UserDtoCompat = UserDto & {
    // Optional compatibility for future multi-role responses
    roles?: Role[];
};

/**
 * Helper function to pick the primary role from the DTO.
 * @param dto - The User DTO.
 * @returns The primary Role.
 */
function pickPrimaryRole(dto: UserDtoCompat): Role {
    if (dto.role) return dto.role;
    const first = dto.roles?.[0];
    if (first) return first;
    throw new Error("User role is missing from DTO");
}

/**
 * Maps a User Data Transfer Object (DTO) to a User domain model.
 * @param dto - The User DTO to be mapped.
 * @returns The corresponding User domain model.
 */
export function userFromDto(dto: UserDtoCompat): User {
    return {
        id: dto.id,
        email: dto.email,
        role: pickPrimaryRole(dto),
        permissions: dto.permissions,
    };
}

/**
 * Maps a Me Data Transfer Object (DTO) to a domain model.
 * @param dto - The Me DTO to be mapped.
 * @returns An object containing the corresponding User domain model.
 */
export function meFromDto(dto: MeDto): { user: User } {
    return {
        user: userFromDto(dto.user),
    };
}
