import PartnerDashboard from '@/components/PartnerDashboard';

export default function PartnerPage() {
  const username = 'IWC Partner'; // Replace with dynamic username from session

  return <PartnerDashboard username={username} />;
}
