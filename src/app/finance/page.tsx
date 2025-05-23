import React from "react";

import FinanceDashboard from '@/components/FinanceDashboard';
const FinancePage = () => {
     const username = 'John Doe';
  return (
    <>
   
      <main style={{ padding: "1rem" }}>
      <FinanceDashboard username="{username}"/>
      </main>
    
    </>
  );
};

export default FinancePage;
