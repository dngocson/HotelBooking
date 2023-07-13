import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/const";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

interface PaginationButtonProps {
  active: boolean;
}
const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
// Define a Pagination component that takes in a count prop
const Pagination = ({ count }: { count: number }) => {
  // Use the useSearchParams hook to get and set the search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // Get the current page from the search parameters or default to 1
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Calculate the total number of pages based on the count and PAGE_SIZE
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Define a function to go to the next page
  function nextPage() {
    // Calculate the next page number, making sure not to go past the last page
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    // Update the search parameters with the new page number
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  // Define a function to go to the previous page
  function prevPage() {
    // Calculate the previous page number, making sure not to go before the first page
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    // Update the search parameters with the new page number
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  // If there is only one page or less, don't render anything
  if (pageCount <= 1) return null;

  // Render the pagination component
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> result
      </P>
      <Buttons>
        <PaginationButton
          active={currentPage !== 1}
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          active={currentPage !== pageCount}
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

// Export the Pagination component as default
export default Pagination;
