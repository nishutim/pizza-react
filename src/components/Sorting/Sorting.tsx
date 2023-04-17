import { FC } from 'react';

import s from './styles.module.scss';

import { usePopup } from '../../hooks';
import { sortTypes } from '../../utils/consts';
import { ISortType } from '../../interfaces';

interface Props {
   selectedSort: ISortType;
   onSortChange: (sort: ISortType) => void;
}

const Sorting: FC<Props> = ({ selectedSort, onSortChange }) => {
   const { show, setShow, ref } = usePopup<HTMLDivElement>();

   const handleShowToggle = () => setShow(show => !show);

   const handleSortTypeChange = (sort: ISortType) => {
      onSortChange(sort);
      setShow(false);
   };

   return (
      <div ref={ref} className={`${s.sorting} ${show ? s.sortingActive : ''}`}>
         <button className={s.sortingLabel} onClick={handleShowToggle}>
            <b>Сортировка по:</b>
            <span>{selectedSort.name}</span>
         </button>
         <div className={s.sortingPopup}>
            <ul className={s.sortTypeList}>
               {sortTypes.map(type => (
                  <li key={type.name}>
                     <button
                        className={`${s.sortTypeItem} ${selectedSort.name === type.name ? s.sortTypeItemActive : ''}`}
                        onClick={() => handleSortTypeChange(type)}
                     >
                        {type.name}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Sorting;