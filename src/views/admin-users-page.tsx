'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from '@/components/ui';
import { AdminCreateUserForm, AdminUpdateUserForm } from '@/components/forms';
import { AdminUserTable } from '@/components/admin-user';
import { useAuth } from '@/hooks/use-auth';
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from '@/hooks/use-admin';
import type {
  UserResponseDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '@/api/generated/data-contracts';

type ViewMode = 'list' | 'create' | 'edit';

export function AdminUsersPage() {
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedUser, setSelectedUser] = useState<UserResponseDto | null>(
    null
  );

  const { data: users = [], isLoading, error } = useAdminUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleCreateUser = async (data: CreateUserRequestDto) => {
    await createUserMutation.mutateAsync(data);
    setViewMode('list');
  };

  const handleUpdateUser = async (data: UpdateUserRequestDto) => {
    if (!selectedUser) return;
    await updateUserMutation.mutateAsync({ id: selectedUser.id, data });
    setViewMode('list');
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUserMutation.mutateAsync(userId);
  };

  const handleEdit = (user: UserResponseDto) => {
    setSelectedUser(user);
    setViewMode('edit');
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedUser(null);
  };

  const isAdmin = currentUser?.roles?.includes('admin');

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('Access Denied')}
          </h1>
          <p className="text-muted-foreground">
            {t('You do not have permission to access this page.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('User Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('Manage system users and their permissions.')}
          </p>
        </div>
        {viewMode === 'list' && (
          <Button onClick={() => setViewMode('create')}>
            {t('Create User')}
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p className="text-sm">
            {error instanceof Error ? error.message : t('Failed to load users')}
          </p>
        </div>
      )}

      <Card>
        {viewMode === 'list' && (
          <>
            <CardHeader>
              <CardTitle>{t('Users')}</CardTitle>
              <CardDescription>
                {t('Total users')}: {users.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  {t('Loading users...')}
                </div>
              ) : (
                <AdminUserTable
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDeleteUser}
                />
              )}
            </CardContent>
          </>
        )}

        {viewMode === 'create' && (
          <>
            <CardHeader>
              <CardTitle>{t('Create User')}</CardTitle>
              <CardDescription>
                {t('Add a new user to the system.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCreateUserForm
                onSubmit={handleCreateUser}
                onCancel={handleCancel}
              />
            </CardContent>
          </>
        )}

        {viewMode === 'edit' && selectedUser && (
          <>
            <CardHeader>
              <CardTitle>{t('Edit User')}</CardTitle>
              <CardDescription>
                {t('Update user information and permissions.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUpdateUserForm
                user={selectedUser}
                onSubmit={handleUpdateUser}
                onCancel={handleCancel}
              />
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
