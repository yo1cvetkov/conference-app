import { useState } from "react";

export default function Checkbox({ item, setSelectedTechnologies }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-1">
      <input
        checked={checked}
        type="checkbox"
        className="w-4 h-4"
        onChange={() => {
          setChecked((prevState) => !prevState);
          if (!checked) {
            setSelectedTechnologies((prevState) => [...prevState, item]);
          } else {
            setSelectedTechnologies((prevState) =>
              prevState.filter((tech) => tech !== item)
            );
          }
        }}
      />
      <span className="text-md font-medium">{item}</span>
    </div>
  );
}
