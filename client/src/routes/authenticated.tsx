import { AuthGuard } from '@/features/auth/components/auth-guard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: AuthGuard,
}); 