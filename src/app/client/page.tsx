"use client";
import React from "react";

import ClientDashboard from '@/components/ClientDashboard';
const ClientPage = () => {
     const username = 'John Doe';
  return (
    <>
   
      <main style={{ padding: "1rem" }}>
      <ClientDashboard username="{username}"/>
      </main>
    
    </>
  );
};

export default ClientPage;
