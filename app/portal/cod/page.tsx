'use client';

import { Button } from '@/components/ui/button';
import { useCodTutorialStore } from './store/useCodTutorialStore';
import { CodTutorialModal } from './components/CodTutorialModal';

export default function CobrosPage() {
  const { openModal } = useCodTutorialStore();

  return (
    <div className="mt-10 flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Cobros Contra Entrega</h1>
      <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700">
        Ver Tutorial
      </Button>
      <CodTutorialModal />
    </div>
  );
}
