import { useDispatch, useSelector } from "react-redux";
import {
  selectTitleFilter,
  setTitleFilter,
} from "../../redux/slices/filterSlice";

import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handletitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
    console.log(titleFilter);
  };

  return (
    <div className="app-block filtert">
      <div className="filter-group">
        <input
          type="text"
          value={titleFilter}
          placeholder="Filter by title...."
          onChange={handletitleFilterChange}
        />
      </div>
    </div>
  );
};

export default Filter;
