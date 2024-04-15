import { useMemo } from 'react';
import {useSelector} from 'react-redux'
import { RootState, State } from '../../../redux/slices/Slice';
import { IBlog } from '../../../shared/types/Blog';

const useTotalBlogCount = (): number => {
    const { data }: State<IBlog> = useSelector((state: RootState) => state.blogReducer);
    
    const totalBlog = useMemo(() => data.length, [data.length]);

    return totalBlog
}

export default useTotalBlogCount