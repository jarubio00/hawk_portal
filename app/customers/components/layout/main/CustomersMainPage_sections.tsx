"use client";

import SectionActions from "./sections/SectionActions";
import SectionButtons from "./sections/SectionButtons";
import SectionCrear from "./sections/SectionCrear";
import SectionDashboard from "./sections/SectionDashboard";
import SectionNews from "./sections/SectionNews";

interface CustomersMainPageProps {
  data?: string;
}

const CustomersMainPage: React.FC<CustomersMainPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-screen min-h-screen">
      <SectionCrear />
      <SectionDashboard />
      <SectionActions />
      <SectionButtons />
    </div>
  );
};

export default CustomersMainPage;
