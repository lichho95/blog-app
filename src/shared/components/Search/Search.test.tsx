import { fireEvent, render } from '@testing-library/react';
import Search from './Search';
import { TestRoot } from '../../test/TestRoot';

describe('<Search />', () => {
  it('should render correctly', () => {
    const mockBtnClick = jest.fn();
    const { getByTestId } = render(<Search onSearch={mockBtnClick} />, { wrapper: TestRoot });
    const inputElement = getByTestId('search') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'abc' } });

    expect(inputElement.value).toBe('abc');
    const btn = getByTestId('btn-search');
    fireEvent.click(btn);

    expect(mockBtnClick).toHaveBeenCalledWith('abc');
  });
});
