import styled from "styled-components";

interface StyledSelectProps {
  type?: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100) "
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, value, type, onChange }: SelectProps) => {
  return (
    <StyledSelect value={value} onChange={onChange} type={type}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
export default Select;
