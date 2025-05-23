import React from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import ProductTable from "../../components/ProductTable";
import SalesDashboard from '@/components/SalesDashboard';

const SalesPage = () => {
     const username = 'John Doe';
  return (
    <>
      {/* <Header /> */}
      <main style={{ padding: "1rem" }}>
     
   <SalesDashboard username={username} />;
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default SalesPage;
