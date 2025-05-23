
import DeveloperDashboard from '@/components/DeveloperDashboard';

const DeveloperPage = () => {
   const username = 'John Doe';
  return (
    <>
      {/* <Header /> */}
      <main style={{ padding: "1rem" }}>
      <DeveloperDashboard username='{username}'/>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default DeveloperPage;
