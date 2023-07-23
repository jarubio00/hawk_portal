'use client';
import Converter from "./PdfConverterClient2";

interface PdfImageViewProps {
 url: string;
}

const PdfImageView: React.FC<PdfImageViewProps> = ({
 url
}) => {
 return (
  <div className='m-0'>
    <Converter url={url}/>
  </div>
 );
}

export default PdfImageView;