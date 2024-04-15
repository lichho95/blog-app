import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { TestRoot } from '../../test/TestRoot';
import userEvent from '@testing-library/user-event';
import { expectTextInTheDocument } from '../../test/expectTextInTheDocument';

describe('<Pagination />', () => {
  const expectActiveClass = (...items: HTMLElement[]) => {
    items.forEach((item) => {
      expect(item).toHaveClass('active');
    });
  };
  const expectDisabledClass = (...items: HTMLElement[]) => {
    items.forEach((item) => {
      expect(item).toHaveClass('disabled');
    });
  };
  const expectNotActiveClass = (...items: HTMLElement[]) => {
    items.forEach((item) => {
      expect(item).not.toHaveClass('active');
    });
  };
  const expectNotDisabledClass = (...items: HTMLElement[]) => {
    items.forEach((item) => {
      expect(item).not.toHaveClass('disabled');
    });
  };
  it('should render correctly', () => {
    const mockGoToPage = jest.fn();
    render(<Pagination totalItem={10} onPageChange={mockGoToPage} />, { wrapper: TestRoot });

    expectTextInTheDocument('1', '2');

    const btnNavigateFirstPage = screen.getByTestId('first-page');
    const btnNavigateLastPage = screen.getByTestId('last-page');

    expect(btnNavigateFirstPage).toBeInTheDocument();
    expect(btnNavigateLastPage).toBeInTheDocument();

    const paginationItems = screen.getAllByRole('listitem');

    expectDisabledClass(paginationItems[0], paginationItems[1])
    expectActiveClass(paginationItems[0], paginationItems[1])
    expectNotActiveClass(paginationItems[2], paginationItems[3])
    expectNotDisabledClass(paginationItems[2], paginationItems[3])

    userEvent.click(screen.getByText(2));
    expectDisabledClass(paginationItems[2], paginationItems[3])
    expectActiveClass(paginationItems[2], paginationItems[3])
    expectNotActiveClass(paginationItems[0], paginationItems[1])
    expectNotDisabledClass(paginationItems[0], paginationItems[1])

    userEvent.click(btnNavigateFirstPage);
    expectDisabledClass(paginationItems[0], paginationItems[1])
    expectActiveClass(paginationItems[0], paginationItems[1])
    expectNotActiveClass(paginationItems[2], paginationItems[3])
    expectNotDisabledClass(paginationItems[2], paginationItems[3])

    userEvent.click(btnNavigateLastPage);
    expectDisabledClass(paginationItems[2], paginationItems[3])
    expectActiveClass(paginationItems[2], paginationItems[3])
    expectNotActiveClass(paginationItems[0], paginationItems[1])
    expectNotDisabledClass(paginationItems[0], paginationItems[1])
  });
});
