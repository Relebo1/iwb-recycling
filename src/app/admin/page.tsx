import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  // Pass logged-in username here, maybe from session or state
  const username = 'John Doe';

  return <AdminDashboard username={username} />;
}
