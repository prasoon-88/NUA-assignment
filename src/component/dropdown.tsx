import { ReactNode } from "react";

interface Children {
  text: string;
  action: any;
}

interface Dropdown {
  children: Children[];
  value: ReactNode;
}

const Dropdown = ({ children, value }: Dropdown) => {
  return (
    <div id="dropdown">
      <i
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {value}
      </i>
      <ul className="dropdown-menu mt-24" aria-labelledby="dropdownMenuButton">
        {children.map((item: Children, index: number) => (
          <li key={index} className="dropdown-item" onClick={item.action}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
