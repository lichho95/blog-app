import usePersistenceUrl from '../../../shared/hooks/usePersistenceUrl';
import { blogs as mockedBlogs } from '../../../shared/test/testFactory';
import { renderHook } from '@testing-library/react-hooks';
import useBlogChange from './useBlogChange';
import { State } from '../../../redux/slices/Slice';
import { IBlog } from '../../../shared/types/Blog';
import { useSelector, useDispatch } from 'react-redux';

jest.mock("react-redux")
const useSelectorMock = jest.mocked(useSelector)
const useDispatchMock = jest.mocked(useDispatch)
jest.mock('../../../share/hooks/usePersistenceUrl');
const usePersistenceUrlMock = jest.mocked(usePersistenceUrl);

describe('useBlogChange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return data without url params', () => {
    useSelectorMock.mockReturnValue({
      data: mockedBlogs,
      error: null,
      status: 'succeeded'
    });
    useDispatchMock.mockReturnValue(jest.fn())
    usePersistenceUrlMock.mockReturnValue({
        urlParams: {},
        changeParams: jest.fn()
    })
    const {result} = renderHook(() => useBlogChange())
    const [blogState, totalBlog ]=  result.current
    const {data: blogs, status, error} = blogState as State<IBlog>
    const totalPage = totalBlog as number

    expect(blogs).toEqual(mockedBlogs)
    expect(error).toBeNull()
    expect(status).toEqual('succeeded')
    expect(totalPage).toEqual(2)
  });

  it('should return data with sort param', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      data: mockedBlogs,
      error: null,
      status: 'succeeded'
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn())
    usePersistenceUrlMock.mockReturnValue({
        urlParams: {sort: 'title-asc'},
        changeParams: jest.fn()
    })
    const {result} = renderHook(() => useBlogChange())
    const [blogState, totalBlog ]=  result.current
    const {data: blogs, status, error} = blogState as State<IBlog>
    const totalPage = totalBlog as number

    for (let i = 0; i < mockedBlogs.length - 1; i++) {
        expect(blogs[i].title.localeCompare(mockedBlogs[i].title)).toBeGreaterThanOrEqual(0);
    }

    expect(error).toBeNull()
    expect(status).toEqual('succeeded')
    expect(totalPage).toEqual(2)
  });
});
