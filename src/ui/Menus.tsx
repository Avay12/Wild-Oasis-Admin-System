import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

type Position = {
  x: number;
  y: number;
};

interface Prop {
  position: Position | null;
}

interface MenuContext {
  openId: string | null;
  close: () => void;
  open: (id: string) => void;
  position: Position | null;
  setPosition: ({ x, y }: Position) => void;
}

interface MenuProps {
  children: ReactNode;
}

interface ToggleProps {
  id: string;
}

interface ListProps {
  id: string;
  children: ReactNode;
}
interface ButtonProps {
  children: ReactNode;
  icon: ReactElement;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListProps {
  id: string;
  children: ReactNode;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<Prop>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<MenuContext>({
  openId: null,
  close: () => {},
  open: (id: string) => {},
  position: null,
  setPosition: () => {},
});

function Menus({ children }: MenuProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// function Menu({ children }: MenuProps) {
//   return <StyledMenu>{children}</StyledMenu>;
// }

// right: 275.216797px;
// top: 215.500015

function Toggle({ id }: ToggleProps) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: any) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" && openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref: any = useOutsideClick(close, false);
  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
