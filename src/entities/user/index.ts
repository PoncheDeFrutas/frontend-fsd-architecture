// Domain
export type { User, Role, Permission } from "./model/types";

// DTO + schemas (para validar respuestas del backend)
export { MeDtoSchema, UserDtoSchema } from "./api/user.dto";
export type { MeDto, UserDto } from "./api/user.dto";

// Mappers (DTO -> Domain)
export { meFromDto, userFromDto } from "./api/user.mapper";
