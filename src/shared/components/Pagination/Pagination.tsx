import { useCallback, useState } from 'react';
import { ITEM_PER_PAGE } from '../../constants';
import usePersistenceUrl from '../../hooks/usePersistenceUrl';

type Props = {
  totalItem: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ totalItem, onPageChange }) => {
  const { urlParams } = usePersistenceUrl();
  const { page } = urlParams;
  const initialPage = page ? parseInt(page, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItem / ITEM_PER_PAGE);
  const generatePaginationNumbers = useCallback(() => {
    const paginationRange = 3;
    const halfRange = Math.floor(paginationRange / 2);

    let startPage = Math.max(currentPage - halfRange, 1);
    const endPage = Math.min(startPage + paginationRange - 1, totalPages);

    if (endPage - startPage + 1 < paginationRange) {
      startPage = Math.max(endPage - paginationRange + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    onPageChange(newPage);
    setCurrentPage(newPage);
  };
  const goToFirstPage = () => {
    onPageChange(1);
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    if (totalPages === currentPage) {
      return false;
    } else {
      onPageChange(totalPages);
      setCurrentPage(totalPages);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li className={`page-item user-select-none ${currentPage === 1 && 'active disabled'}`}>
          <span
            className="page-link"
            data-testid="first-page"
            aria-hidden="true"
            onClick={goToFirstPage}>
            &laquo;
          </span>
        </li>
        {generatePaginationNumbers().map((number) => (
          <li className={`page-item user-select-none ${currentPage === number && 'active disabled'}`}>
            <span className="page-link" onClick={() => goToPage(number)}>
              {number}
            </span>
          </li>
        ))}
        <li className={`page-item user-select-none ${totalPages === currentPage && 'active disabled'}`}>
          <span
            className="page-link"
            data-testid="last-page"
            aria-hidden="true"
            onClick={goToLastPage}>
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
