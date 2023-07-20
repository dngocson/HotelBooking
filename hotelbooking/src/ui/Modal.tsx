import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  cloneElement,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

// Create a context object for the modal
const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => undefined,
  open: () => undefined,
});

interface ModalProps {
  children: ReactElement | ReactElement[];
}

// Define the Modal component
function Modal({ children }: ModalProps) {
  // Use the useState hook to create a state variable for the name of the open modal window
  const [openName, setOpenName] = useState("");
  // Define a function to close the modal window by setting the openName state variable to an empty string
  const close = () => setOpenName("");
  // Define a function to open a modal window by setting the openName state variable to the name of the window to open
  const open = setOpenName;

  // Render the Modal component
  return (
    // Provide the openName, close, and open values to child components via the ModalContext object
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

// Define the Open component, which is used to trigger the opening of a modal window
function Open({ children, opens: opensWindowName }: OpenProps) {
  // Get the open function from the ModalContext object
  const { open } = useContext(ModalContext);
  // Render the Open component by cloning its child element and adding an onClick handler that calls the open function with the name of the window to open
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

// Define the Window component, which is used to display the content of a modal window
function Window({ children, name }: WindowProps) {
  // Get the openName and close values from the ModalContext object
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);
  // If this Window component's name prop does not match the current value of openName, do not render anything
  if (name !== openName) return null;

  // Render the Window component by creating a portal that renders its content into a new DOM node that is appended to document.body
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Add the Open and Window components as properties of the Modal component
Modal.Open = Open;
Modal.Window = Window;
// Export the Modal component as the default export of this module
export default Modal;
