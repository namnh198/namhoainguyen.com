import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import '@/styles/search.css';

export default function Search({ appId, apiKey, indexName }: { appId: string; apiKey: string; indexName: string }) {
  return <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} placeholder="Search Notes..." />;
}
