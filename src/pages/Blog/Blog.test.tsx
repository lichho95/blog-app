import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { TestRoot } from '../../shared/test/TestRoot';
import useBlogChange from './hooks/useBlogChange';
import { blogs } from '../../shared/test/testFactory';
import { expectTextInTheDocument } from '../../shared/test/expectTextInTheDocument';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('./hooks/useBlogChange');
const useBlogChangeMock = jest.mocked(useBlogChange);
describe('<Blog />', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    mockedUsedNavigate('')
    
    useBlogChangeMock.mockReturnValue([
        {
            data: blogs,
            error: '',
            status: 'succeeded'
          },2
    ]);

    render(<Blog />, { wrapper: TestRoot });

    expect(screen.getByText('Blogs')).toBeInTheDocument();

    blogs.forEach((blog) => {
      expectTextInTheDocument(blog.content, blog.title);
    });
  });
});
