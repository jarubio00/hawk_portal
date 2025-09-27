export default function CreateShipmentButtonSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full h-12 rounded-md bg-gray-200 animate-pulse flex items-center justify-center gap-2 px-4">
        <div className="w-5 h-5 bg-gray-300 rounded" />
        <div className="h-3 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
