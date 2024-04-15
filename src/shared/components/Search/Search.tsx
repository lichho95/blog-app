import { useState } from 'react';
import usePersistenceUrl from '../../hooks/usePersistenceUrl';
import { PersistenceUrl } from '../../types/UrlType';

type Search = {
  onSearch: (search: string) => void;
  className?: string;
};

const Search = ({ onSearch, className = '' }: Search) => {
  const { urlParams }: PersistenceUrl = usePersistenceUrl();
  const { search } = urlParams;
  const [searchBlog, setSearch] = useState(search || '');

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <input
        className="form-control mr-sm-2"
        type="search"
        value={searchBlog}
        placeholder="Search"
        aria-label="Search"
        data-testid="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        data-testid="btn-search"
        onClick={() => onSearch(searchBlog)}>
        Search
      </button>
    </div>
  );
};

export default Search;
