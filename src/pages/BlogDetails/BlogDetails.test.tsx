import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { blogs } from '../../shared/test/testFactory';
import { expectTextInTheDocument } from '../../shared/test/expectTextInTheDocument';
import { render } from '@testing-library/react';
import BlogDetails from './BlogDetails';
import { useParams } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useParams: jest.fn()
}));
jest.mock('react-redux');
const useSelectorMock = jest.mocked(useSelector);
const useDispatchMock = jest.mocked(useDispatch);

describe('<BlogDetails />', () => {
  it('should render correctly', () => {
    (useParams as jest.Mock).mockReturnValue({id: '2'})
    mockedUsedNavigate('');
    useSelectorMock.mockReturnValue({
      data: blogs[0],
      error: null,
      status: 'succeeded'
    });
    useDispatchMock.mockReturnValue(jest.fn());

    render(<BlogDetails />);
    // expect(screen.getByText('a')).toBeInTheDocument()
    expectTextInTheDocument(blogs[0].title, blogs[0].content);
  });
});
