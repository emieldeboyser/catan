import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Inputveld = ({
  value,
  onChange,
  placeholder,
  id,
  lastElement = true,
  deleteInput,
  hideClose,
}) => {
  return (
    <div className="flex items-center gap-5 h-fit relative">
      <input
        type="text"
        value={value}
        onChange={onChange} // Ensure onChange is wired properly
        placeholder={placeholder}
        id={id}
        name={id} // `name` should match `id` in state
        className="border-2 border-gray-300 rounded-md p-2"
      />
      {!lastElement && <div className="h-3 bg-red-500">+</div>}
      {!hideClose && (
        <div
          onClick={deleteInput}
          className="w-5 flex justify-center absolute right-2 cursor-pointer opacity-30 hover:opacity-100 hover:text-red-400"
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}
    </div>
  );
};

export default Inputveld;
