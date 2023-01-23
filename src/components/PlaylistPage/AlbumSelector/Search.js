const Search = ({ setValue, value }) => {
  const handleChange = (event) => {
    console.log(event.target);
    setValue(event.target.value);
  };
  return (
    <div className="form-control m-3">
      <label className="label">
        <span className="label-text">Filter</span>
        <input
          className="input input-bordered"
          type={"text"}
          value={value}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
};

export default Search;
