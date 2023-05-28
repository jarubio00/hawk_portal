'use client'

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

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

const BuscarCodigo  = () => {

return (
    <div className="my-4 bg-neutral-500 h-96 w-96">
        <InstantSearch 
            searchClient={algoliaClient} 
            indexName="codigos_postales"
            
            >
    
                {/* Adding Search Box */}
                <SearchBox  classNames={{
                    root: 'p-3 shadow-sm',
                    form: 'relative',
                    input: 'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
                    submitIcon: 'absolute top-2 right-2 bottom-0 w-18',
                    }}

                />
        
                {/* Adding Data */}
                <Hits />
        </InstantSearch>
    </div>
    );

}
export default BuscarCodigo