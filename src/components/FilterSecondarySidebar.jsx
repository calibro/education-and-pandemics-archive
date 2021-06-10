import * as React from "react";
import arrow from "../assets/arrow.svg";

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    let fromDatePicker =
      e.target.className instanceof String &&
      e.target.className.includes("react-datepicker");
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !ref.current.parentNode.contains(e.target) &&
      !fromDatePicker
    ) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const FilterSecondarySidebar = ({ open, width, children, title, onClose }) => {
  const clickRef = React.useRef();
  useClickOutside(clickRef, () => {
    open && onClose();
  });

  return (
    <React.Fragment>
      <div
        ref={clickRef}
        className={`secondary-sidebar ${open ? "open" : ""}`}
        style={{
          width: `${width}px`,
        }}
      >
        <div className="secondary-sidebar-header">
          <div
            className="arrow-icon reverse"
            style={{ backgroundImage: `url(${arrow})` }}
            onClick={() => onClose()}
          ></div>
          <div className="filter-title">{title}</div>
        </div>
        <div className="secondary-sidebar-content">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default FilterSecondarySidebar;
