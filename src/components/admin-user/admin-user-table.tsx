'use client';

import { useTranslation } from 'react-i18next';
import type { UserResponseDto } from '@/api/generated/data-contracts';
import { AdminUserTableRow } from './admin-user-table-row';

interface AdminUserTableProps {
  users: UserResponseDto[];
  onEdit: (user: UserResponseDto) => void;
  onDelete: (userId: string) => void;
}

export function AdminUserTable({
  users,
  onEdit,
  onDelete,
}: AdminUserTableProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Email')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Name')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Roles')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Provider')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Status')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {t('Created')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                {t('Actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <AdminUserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          {t('No users found')}
        </div>
      )}
    </div>
  );
}
