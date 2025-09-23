// components/ui/SkeletonBox.tsx
export default function SkeletonBox({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
  );
}
