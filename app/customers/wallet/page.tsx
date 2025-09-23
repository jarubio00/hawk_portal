import dynamic from "next/dynamic";

const WalletSection = dynamic(
  () => import("../components/layout/main/wallet/WalletMainPage"),
  {
    ssr: false,
  }
);

const WalletPage = () => {
  // Aquí podrías hacer fetch del saldo en el servidor si lo deseas
  const balance = "$1,500.00"; // Simulación de dato, puedes pasarlo como prop desde un loader

  return <WalletSection balance={balance} />;
};

export default WalletPage;
