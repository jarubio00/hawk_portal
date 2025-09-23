import AvisosProgramacion from "../crear/steps/components/AvisosProgramacion";
import ProgramacionV2Step from "../crear/steps/ProgramacionV2";

export default function DashboardPage() {
  return (
    <div className="mt-10 flex justify-center items-center ">
      <AvisosProgramacion>
        <ProgramacionV2Step />
      </AvisosProgramacion>
    </div>
  );
}
