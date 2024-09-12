import { useState } from "react";

const Checkbox = ({ label, change, value, checked }) => {
//const [isChecked, setIsChecked] = useState(checked);
const [isChecked, setIsChecked] = useState(true);

  const handleChange = function(e){
    let  checked = isChecked ? "" : "checked";
    setIsChecked(checked);
    change(value, checked);
  }

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange}/>
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;