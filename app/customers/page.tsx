"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CustomersMainPage from "./components/layout/main/CustomersMainPage";
import CustomersToolbar from "./components/layout/toolbar/CustomersToolbar";

interface CustomersPageProps {
  searchParams: any;
}

const CustomersPage = async ({ searchParams }: CustomersPageProps) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col-2">
        <CustomersMainPage />
      </div>
    </div>
  );
};

export default CustomersPage;
