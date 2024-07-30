import "./Filter.css";
import { ChangeEvent, useId } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setFilterTitle,
  resetFilters,
  setFilterAuthor,
  setOnlyFavorite,
} from "../../redux/slices/filterSlice";

export default function Filter() {
  const id = useId();
  const dispatch = useAppDispatch();

  const filterTitleValue = useAppSelector((state) => state.filter.title);
  const filterAuthorValue = useAppSelector((state) => state.filter.author);
  const filterOnlyFavorite = useAppSelector(
    (state) => state.filter.onlyFavorite
  );

  const filterTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setFilterTitle(e.target.value));

  const filterAuthorHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setFilterAuthor(e.target.value));

  const filterOnlyFavoriteHandler = () =>
    dispatch(setOnlyFavorite(!filterOnlyFavorite));

  const resetFilterHandler = () => dispatch(resetFilters());

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title"
            value={filterTitleValue}
            onChange={filterTitleHandler}
            id={`${id}--title`}
            name={`${id}--title`}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            value={filterAuthorValue}
            onChange={filterAuthorHandler}
            id={`${id}--author`}
            name={`${id}--author`}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={filterOnlyFavorite}
              onChange={filterOnlyFavoriteHandler}
              id={`${id}--favorite`}
              name={`${id}--favorite`}
            />
            Only Favorite
          </label>
        </div>
        <button onClick={resetFilterHandler}>Reset Filters</button>
      </div>
    </div>
  );
}
