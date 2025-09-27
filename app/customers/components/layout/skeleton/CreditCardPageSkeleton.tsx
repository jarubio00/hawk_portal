export default function CreditCardPageSkeleton() {
  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

      <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="relative flex items-center gap-3 p-4 pl-5 hover:bg-gray-50"
          >
            {/* Icono */}
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />

            {/* Texto */}
            <div className="flex flex-col gap-2 text-left">
              <div className="w-40 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="w-28 h-2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Botón */}
      <div className="mt-6 w-full h-11 bg-gray-200 rounded-md animate-pulse" />
    </div>
  );
}
