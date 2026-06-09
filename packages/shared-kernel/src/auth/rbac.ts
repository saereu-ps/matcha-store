import { createError } from '../errors/error-factory.js';
import type { AuthContext } from './types.js';

/**
 * Check if the auth context has the required role.
 * Throws ProblemDetail if not authorized.
 */
export function requireRole(context: AuthContext, role: string): void {
  if (!context.roles.includes(role)) {
    throw createError('FORBIDDEN', {
      detail: `Required role: ${role}. User roles: ${context.roles.join(', ')}`,
    });
  }
}

/**
 * Check if the auth context has the required permission.
 * Permissions are derived from roles using a role→permission mapping.
 */
export function requirePermission(context: AuthContext, permission: string): void {
  const userPermissions = derivePermissions(context.roles);
  if (!userPermissions.includes(permission)) {
    throw createError('FORBIDDEN', {
      detail: `Required permission: ${permission}`,
    });
  }
}

const ROLE_PERMISSIONS: Record<string, string[]> = {
  anonymous: ['read:products', 'read:content', 'read:categories'],
  customer: [
    'read:products', 'read:content', 'read:categories',
    'write:cart', 'write:orders', 'write:profile', 'write:reviews', 'write:journal',
  ],
  subscriber: [
    'read:products', 'read:content', 'read:categories',
    'write:cart', 'write:orders', 'write:profile', 'write:reviews', 'write:journal',
    'write:subscription', 'read:loyalty',
  ],
  content_admin: [
    'read:products', 'read:content', 'read:categories',
    'write:cart', 'write:orders', 'write:profile', 'write:reviews', 'write:journal',
    'write:products', 'write:content',
  ],
  operations_admin: [
    'read:products', 'read:content', 'read:categories',
    'write:cart', 'write:orders', 'write:profile', 'write:reviews', 'write:journal',
    'write:products', 'write:content', 'write:subscription',
    'read:loyalty', 'read:analytics', 'write:experiments', 'write:users',
  ],
};

function derivePermissions(roles: string[]): string[] {
  const permissions = new Set<string>();
  for (const role of roles) {
    const rolePerms = ROLE_PERMISSIONS[role] ?? [];
    for (const perm of rolePerms) {
      permissions.add(perm);
    }
  }
  return [...permissions];
}
