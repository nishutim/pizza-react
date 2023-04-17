import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import s from './styles.module.scss';

import { usePopup } from '../../hooks';

import { ClearBtn } from '..';

interface Props {
   searchValue: string;
   onChange: (value: string) => void;
}

const SearchMobile: FC<Props> = ({ searchValue, onChange }) => {
   const [value, setValue] = useState(searchValue);

   const { show, setShow, ref } = usePopup<HTMLDivElement>();
   const inputRef = useRef<HTMLInputElement>(null);

   const handleShowToggle = () => {
      setShow(show => !show);
      setTimeout(() => inputRef.current?.focus(), 300);
   };

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
      <div ref={ref} className={`${s.search} ${show ? s.searchActive : ''}`}>
         <button
            className={s.searchBtn}
            onClick={handleShowToggle}
         >
            <FiSearch />
         </button>
         <div className={s.searchPopup}>
            <div>
               <FiSearch className={s.searchIcon} />
               <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={handleChange} />
               {value && (
                  <ClearBtn
                     onClick={handleInputClear} />
               )}
            </div>
         </div>
      </div>
   )
}

export default SearchMobile;