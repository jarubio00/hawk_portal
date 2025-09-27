import dynamic from "next/dynamic";

const CreditCardSection = dynamic(() => import("./CreditCardPage"), {
  ssr: false,
});

const CreditPage = () => {
  return <CreditCardSection />;
};

export default CreditPage;
