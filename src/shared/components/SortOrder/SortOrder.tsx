import { ChangeEventHandler, useState } from 'react';
import { getSortObj } from '../../../utils/utils';
import usePersistenceUrl from '../../hooks/usePersistenceUrl';
import { PersistenceUrl } from '../../types/UrlType';

type Props = {
  onSortOrderHandle: (sortValue: string, orderValue: string) => void;
  className?: string;
};

const SortOrder: React.FC<Props> = ({ onSortOrderHandle, className = '' }) => {
  const { urlParams }: PersistenceUrl = usePersistenceUrl();
  const { sort } = urlParams;
  const { sortVal, sortOrder } = getSortObj(sort);
  const [orderBy, setOrderBy] = useState(sortOrder || 'asc');
  const [sortBy, setSortBy] = useState(sortVal || 'id');
  const onSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const sortValue = e?.target?.value;
    setSortBy(sortValue);
    onSortOrderHandle(sortValue, orderBy);
  };

  const onOrderByClick = (orderValue: string) => {
    setOrderBy(orderValue);
    onSortOrderHandle(sortBy, orderValue);
  };

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <label className="mr-2">Sort By:</label>
      <div>
        <select className="custom-select" value={sortBy} onChange={onSortChange}>
          <option>--Select--</option>
          <option value="id">Id</option>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>
      {orderBy === 'asc' ? (
        <i
          className="bi bi-sort-up ml-2 icon-size"
          data-testid="sort-up"
          onClick={() => onOrderByClick('desc')}
        />
      ) : (
        <i
          className="bi bi-sort-down ml-2 icon-size"
          data-testid="sort-down"
          onClick={() => onOrderByClick('asc')}
        />
      )}
    </div>
  );
};

export default SortOrder;
