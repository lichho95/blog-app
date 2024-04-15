import { getSortObj, sortArray } from './../../../utils/utils';
import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import getBlogsThunk from '../../../redux/thunks/getBlogsThunk';
import usePersistenceUrl from '../../../shared/hooks/usePersistenceUrl';
import { ITEM_PER_PAGE, SORT_FIELDS } from '../../../shared/constants';
import { RootState, State } from '../../../redux/slices/Slice';
import { IBlog } from '../../../shared/types/Blog';

const useBlogChange = () => {
  const { urlParams } = usePersistenceUrl();
  const { page, sort, search } = urlParams;
  const { sortVal, sortOrder } = getSortObj(sort);
  const { data, error, status }: State<IBlog> = useSelector((state: RootState) => state.blogReducer);
  const [totalBlog, setTotalBlog] = useState(data.length)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBlogsThunk());
  }, []);

  const blogs = useMemo(() => {
    let processedBlogs: IBlog[] = data ?? [];
    if (search) {
      processedBlogs = processedBlogs.filter(
        ({ title, content }: IBlog) =>
          title?.toLowerCase().includes(search.toLowerCase()) ||
          content?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort && SORT_FIELDS.includes(sortVal)) {
      processedBlogs = sortArray(processedBlogs, sortOrder, sortVal as keyof IBlog);
      setTotalBlog(processedBlogs.length)
    }
    if (page) {
      const lastIndex = parseInt(page, 10) * ITEM_PER_PAGE;
      const firstIndex = lastIndex - ITEM_PER_PAGE;
      processedBlogs = processedBlogs.slice(firstIndex, lastIndex);
    } else {
      processedBlogs = processedBlogs.slice(0, ITEM_PER_PAGE);
    }

    return processedBlogs;
  }, [sortVal, sortOrder, page, search, data]);

  return [{ data: blogs, error, status }, totalBlog];
};

export default useBlogChange;
