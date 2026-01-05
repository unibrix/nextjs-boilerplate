'use client';

import { useTranslation } from 'react-i18next';
import type { UserResponseDto } from '@/api/generated/data-contracts';
import { AdminUserTableActions } from './admin-user-table-actions';

interface AdminUserTableRowProps {
  user: UserResponseDto;
  onEdit: (user: UserResponseDto) => void;
  onDelete: (userId: string) => void;
}

export function AdminUserTableRow({
  user,
  onEdit,
  onDelete,
}: AdminUserTableRowProps) {
  const { t } = useTranslation();

  const userName =
    user.firstName || user.lastName
      ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
      : '-';

  return (
    <tr className="hover:bg-muted/20">
      <td className="px-4 py-3 text-sm">{user.email}</td>
      <td className="px-4 py-3 text-sm">{userName}</td>
      <td className="px-4 py-3 text-sm">
        <div className="flex gap-1">
          {user.roles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {role}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-sm capitalize">{user.provider}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            user.isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {user.isActive ? t('Active') : t('Inactive')}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-right text-sm">
        <AdminUserTableActions
          userId={user.id}
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
        />
      </td>
    </tr>
  );
}
