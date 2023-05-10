import 'Search/Search.scss';
import { useState, useRef } from 'react';
import {ISearch} from 'Search/ISearch';

/**
 * @link Search/Search
 * @description Поиск
 */
export default function Search({
  value = '',
  placeholder = 'Найти...',
  changeCallback,
  expandable = false,
}: ISearch) {
  const [thisValue, setThisValue] = useState(value);
  const [expand, setExpand] = useState(false);
  const container = useRef(null);

  const onChange = (e: InputEvent) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    changeCallback && changeCallback(value);
    setThisValue(value);
  };

  const changeValue = (value: string) => {
    changeCallback && changeCallback(value);
    setThisValue(value);
    (container.current as HTMLInputElement).value = value;
  };

  return (
    <section className="searchWrapper">
      {expandable && !expand && (
        <div
          className="search__expandBtn_true ti-search"
          onClick={() => setExpand(true)}
        />
      )}
      {(!expandable || expand) && (
        <section className={`search ${expandable ? 'search__expandAnim' : ''}`}>
          <input
            ref={container}
            className="search__input"
            placeholder={placeholder}
            onChange={onChange}
          />
          {thisValue && (
            <div className="search__clear" onClick={() => changeValue('')}>
              ✕
            </div>
          )}
        </section>
      )}
      {expandable && expand && (
        <div
          className="search__expandBtn_false"
          onClick={() => setExpand(false)}
        >
          ✕
        </div>
      )}
    </section>
  );
}
