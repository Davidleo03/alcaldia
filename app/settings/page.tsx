import { MainLayout } from '@/components/layout/MainLayout';
import { SettingsView } from '@/components/views/SettingsView';

export const metadata = {
  title: 'Settings - Municipal Services',
  description: 'Manage your account and system settings',
};

export default function SettingsPage() {
  return (
    <MainLayout>
      <SettingsView />
    </MainLayout>
  );
}
