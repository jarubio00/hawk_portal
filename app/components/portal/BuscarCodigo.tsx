'use client'

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';
import Button from "../Button";

    const searchClient = algoliasearch(
        //@ts-ignore
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
      );

      const algoliaClient = {
        ...algoliasearch,
        search(requests: any) {
            //@ts-ignore
            if (requests.every(({ params }) => params.query.length < 4)) {
                return Promise.resolve({
                  results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                    nbPages: 0,
                    page: 0,
                    processingTimeMS: 0,
                    hitsPerPage: 0,
                    exhaustiveNbHits: false,
                    query: '',
                    params: '',
                  })),
                });
              }

            return searchClient.search(requests);
        }
      }

  interface BuscarCodigoProps {
    useCp: (cp: any) => void;
    onClose: () => void;
  }

const BuscarCodigo: React.FC<BuscarCodigoProps>  = ({
  useCp,
  onClose
}) => {

  //@ts-ignore
  const Hit = ({ hit}) => (

    <div className="flex flex-row my-2 p-2 border-1 justify-between items-center border-neutral-200 rounded-sm border-b cursor-pointer "
          onClick={() => {
            useCp({id: hit?.codigo_postal, col: hit?.colonia, colId: hit?.id});
            onClose();
          }}
    >
      <div className="flex flex-col">
        <p className="text-xs text-neutral-500 ">
          <Highlight attribute="colonia" hit={hit} highlightedTagName={'mark'} />
        </p>
        <p className="text-xs text-blue-500">
          {hit?.municipio}
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-bold ">
          {hit?.codigo_postal}
        </p>
        <div className="w-12 bg-rose-500 py-1 shadow-md text-center text-white hover:bg-rose-400 rounded-md text-xs cursor-pointer" 
            onClick={() => {
              useCp({id: hit?.codigo_postal, col: hit?.colonia, colId: hit?.id});
              onClose();
            }}>
          Usar
        </div>
      </div>
    </div>
  );



return (
    <div className="my-0 w-full">
        <InstantSearch 
            searchClient={algoliaClient} 
            indexName="codigos_postales"
            
            >
    
                {/* Adding Search Box */}
                <SearchBox  placeholder={'Escribe la colonia'} classNames={{
                    root: 'p-3 shadow-sm ',
                    form: 'relative',
                    input: 'block w-full pl-6 pr-3 py-2 bg-white border border-neutral-300 placeholder-neutral-400 focus:outline-none focus:border-rose-500 focus:ring-rose-500 rounded-full focus:ring-1',
                    submitIcon: 'absolute left-2 top-4 font-xl text-neutral-500 ',
                    resetIcon: 'bg-rose-500',
                    reset: 'hidden',
                  
                    }}

                />
        
                <div className=" max-h-72 md:h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent scrollbar-rounded"> 
                  <Hits hitComponent={Hit}/>
                </div>
        </InstantSearch>
    </div>
    );

}
export default BuscarCodigo