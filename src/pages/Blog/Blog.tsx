import { useNavigate } from 'react-router-dom';
import { State } from '../../redux/slices/Slice';
import Pagination from '../../shared/components/Pagination/Pagination';
import Search from '../../shared/components/Search/Search';
import SortOrder from '../../shared/components/SortOrder/SortOrder';
import usePersistenceUrl from '../../shared/hooks/usePersistenceUrl';
import { IBlog } from '../../shared/types/Blog';
import useBlogChange from './hooks/useBlogChange';
import Error from '../../shared/components/Error/Error';
import Spinner from '../../shared/components/Spinner/Spinner';

const Blog = () => {
  const navigate = useNavigate();
  const { changeParams } = usePersistenceUrl();
  const [blogState, totalBlog] = useBlogChange();
  const { data: blogs, status } = blogState as State<IBlog>
  const totalPage = totalBlog as number

  if (status === 'failed') return <Error />

  return (
    <div data-testid="blog-page">
      <h1>Blogs</h1>
      <div className="row justify-content-end mt-5">
        <SortOrder
          onSortOrderHandle={(sortBy: string, orderBy: string) => {
            changeParams({ sort: `${sortBy}-${orderBy}` });
          }}
          className="col-12 col-md-3"
        />
        <Search
          onSearch={(search: string) => changeParams({ search })}
          className="col-12 col-md-3"
        />
      </div>
      <ul className="list-unstyled mt-4">
        {
          status === 'loading' && <Spinner />
        }
        {
          status === 'succeeded' && (blogs.length > 0 ? (
            blogs.map(({ image, content, title, id }: IBlog) => (
              <li className="media mb-4">
                <img src={image} width={64} height={64} className="mr-3" alt="..." />
                <div className="media-body">
                  <h5 className="mt-0 mb-1 user-select-none" onClick={() => navigate(`/blog/${id}`)}>
                    {title}
                  </h5>
                  {content}
                </div>
              </li>
            ))
          ) : (
            <div>No data</div>
          ))
        }
      </ul>
      {totalPage > 0 && (
        <Pagination
          totalItem={totalPage}
          onPageChange={(page: number) => {
            changeParams({ page: page.toString() });
          }}
        />
      )}
    </div>
  );
};

export default Blog;
