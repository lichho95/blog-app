import { render, screen } from "@testing-library/react"
import SortOrder from "./SortOrder"
import { TestRoot } from "../../test/TestRoot"
import userEvent from "@testing-library/user-event"

describe('<SortOrder />', () => {
    it('should render correctly', () => {
        render(<SortOrder onSortOrderHandle={jest.fn()} />, {wrapper: TestRoot})

        expect(screen.getByText('Sort By:')).toBeInTheDocument()
        expect(screen.getByText('--Select--')).toBeInTheDocument()
        expect(screen.getByText('Id')).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
        expect(screen.getByText('Created At')).toBeInTheDocument()
        
        const iconSortUp = screen.getByTestId('sort-up')
        expect(iconSortUp).toBeInTheDocument()

        userEvent.click(iconSortUp)
        expect(screen.getByTestId('sort-down')).toBeInTheDocument()
    })
})