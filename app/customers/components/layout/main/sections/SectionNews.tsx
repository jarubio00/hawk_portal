"use client";

interface SectionNewsProps {
  data?: string;
}

const SectionNews: React.FC<SectionNewsProps> = ({ data }) => {
  return (
    <div className=" bg-white px-0 py-2 space-y-4">
      {/* Wide cards con imagen */}
      <ImageCard
        image="/images/mockup1.jpg"
        title="Llegaron los pagos en línea"
        subtitle="Disponible pronto"
      />
    </div>
  );

  function ImageCard({
    image,
    title,
    subtitle,
  }: {
    image: string;
    title: string;
    subtitle: string;
  }) {
    return (
      <div className="rounded-xl overflow-hidden relative bg-gray-50">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute bottom-3 left-4 text-white drop-shadow-md">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>
    );
  }
};

export default SectionNews;
