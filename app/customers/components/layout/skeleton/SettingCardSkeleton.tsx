// components/ui/SettingCardSkeleton.tsx
import SkeletonBox from "./SkeletonBox";

export default function SettingCardSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 px-2 min-h-[78px] w-full">
      <div className="flex items-center gap-4">
        <SkeletonBox className="w-10 h-10" />
        <div className="space-y-1">
          <SkeletonBox className="w-24 h-4" />
          <SkeletonBox className="w-36 h-3" />
        </div>
      </div>
      <SkeletonBox className="w-5 h-5" />
    </div>
  );
}
