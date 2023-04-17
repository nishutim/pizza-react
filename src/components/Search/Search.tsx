import React, { ChangeEvent, FC, useState, useRef, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import s from './styles.module.scss';

import { ClearBtn } from '..';

interface Props {
   searchValue: string;
   onChange: (value: string) => void;
}

const Search: FC<Props> = React.memo(({ searchValue, onChange }) => {
   const [focused, setFocused] = useState(false);
   const [value, setValue] = useState(searchValue);

   const inputRef = useRef<HTMLInputElement>(null);

   const handleFocusChange = useCallback(() => setFocused(focused => !focused), []);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(value);
      onChange(value);
   };

   const handleInputClear = useCallback(() => {
      setValue('');
      onChange('');
      inputRef.current?.focus();
   }, []);

   return (
      <div className={`${s.search} ${focused ? s.searchFocused : ''}`}>
         <FiSearch className={s.searchIcon} />
         <input
            ref={inputRef}
            type="text"
            value={value}
            onFocus={handleFocusChange}
            onBlur={handleFocusChange}
            onChange={handleChange} />
         {value && (
            <ClearBtn
               onClick={handleInputClear} />
         )}
      </div>
   );
});

export default Search;