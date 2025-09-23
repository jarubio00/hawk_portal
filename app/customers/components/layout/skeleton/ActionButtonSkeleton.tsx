// components/ui/ActionButtonSkeleton.tsx
import SkeletonBox from "./SkeletonBox";

export default function ActionButtonSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2 px-2 border border-gray-100 rounded-md w-full text-center">
      <SkeletonBox className="w-5 h-5" />
      <SkeletonBox className="w-3/4 h-3" />
    </div>
  );
}
