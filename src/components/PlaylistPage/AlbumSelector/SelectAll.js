const SelectAll = ({ checked, onChange }) => {
  return (
    <div className="form-control m-3">
      <label className="label cursor-pointer">
        <span className="label-text">Select All</span>
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};

export default SelectAll;
