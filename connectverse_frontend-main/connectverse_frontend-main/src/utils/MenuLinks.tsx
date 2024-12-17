import { FC, ReactElement, SVGProps } from "react";
import { useNavigate } from "react-router-dom";

interface MenuLinksProps {
  icon: FC<SVGProps<SVGSVGElement>>; // Icon component with SVG props
  text: string; // Text to display alongside the icon
  route: string; // Route to navigate to
}

const MenuLinks: FC<MenuLinksProps> = ({
  icon: Icon,
  text,
  route,
}): ReactElement => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <div className="group" onClick={handleNavigation}>
      <div className="link text-white flex items-center gap-2 pt-6 group-hover:caret-indigo-50 hover:cursor-pointer">
        {Icon && (
          <Icon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
        )}
        <span className="text-xl text-white group-hover:text-blue hover:text-blue-600">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MenuLinks;
