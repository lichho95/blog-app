import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import getBlogDetailsThunk from '../../redux/thunks/getBlogDetailsThunk';
import { RootState } from '../../redux/slices/Slice';
import Spinner from '../../shared/components/Spinner/Spinner';
import Error from '../../shared/components/Error/Error';

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, status } = useSelector((state: RootState) => state.blogDetailsReducer);

  useEffect(() => {
    if(id) {
      dispatch(getBlogDetailsThunk(id));
    }
  }, [id, dispatch]);

  const { title, image, content } = data;

  if(status === 'failed') return <Error />

  return (
    <div data-testid="blog-details-page">
      <h1 className="text-center mt4 mb-4">Blog Details</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li
            className="breadcrumb-item user-select-none"
            aria-current="page"
            onClick={() => navigate('/blogs')}>
            Blog
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog details
          </li>
        </ol>
      </nav>
      <div>
        {status === 'loading' && <Spinner />}
        {status === 'succeeded' && (
          <>
            <img src={image} width="100%" height="300px" />
            <h3 className="mt-3 mb-3">{title}</h3>
            <p>{content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
