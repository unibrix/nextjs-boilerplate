'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';

interface AdminUserTableActionsProps {
  userId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function AdminUserTableActions({
  userId: _userId,
  onEdit,
  onDelete,
}: AdminUserTableActionsProps) {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (isDeleting) {
      onDelete();
      setIsDeleting(false);
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={onEdit}>
        {t('Edit')}
      </Button>
      <Button
        variant={isDeleting ? 'destructive' : 'outline'}
        size="sm"
        onClick={handleDelete}
      >
        {isDeleting ? t('Confirm?') : t('Delete')}
      </Button>
    </div>
  );
}
