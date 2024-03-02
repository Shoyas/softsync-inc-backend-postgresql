import { IAdminRoleEnum } from './admin.interface';

export const adminRoleEnum: IAdminRoleEnum[] = ['admin', 'super_admin'];

export const adminSearchableFields = ['userName', 'role', 'id'];

export const adminFilterableFields = ['searchTerm', 'role'];
