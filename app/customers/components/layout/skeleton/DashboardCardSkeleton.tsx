// components/ui/DashboardCardSkeleton.tsx
import SkeletonBox from "./SkeletonBox";

export default function DashboardCardSkeleton() {
  return (
    <div className="h-32 p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between w-full">
      <SkeletonBox className="w-7 h-7" />
      <div className="space-y-1">
        <SkeletonBox className="w-1/2 h-4" />
        <SkeletonBox className="w-3/4 h-3" />
      </div>
    </div>
  );
}
