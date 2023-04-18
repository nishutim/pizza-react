import React, { FC, useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

import s from './styles.module.scss';

import { getPagesOfPortion } from '../../utils';

interface Props {
   customStyle?: string;
   selectedPage: number;
   limit?: number;
   portionSize?: number;
   totalCount?: number;
   onPageChange: (page: number) => void;
   deps: unknown[];
};

const Pagination: FC<Props> = React.memo(({ customStyle = '', selectedPage, limit = 8, portionSize = 5, totalCount = 10, onPageChange, deps }) => {
   const [currentPortion, setCurrentPortion] = useState(Math.ceil(selectedPage / portionSize));
   const shouldResetPagination = useRef(false);

   const pagesCount = Math.ceil(totalCount / limit);
   const portionsCount = Math.ceil(pagesCount / portionSize);
   const firstPageOfPortion = currentPortion * portionSize - portionSize + 1;
   const lastPageOfPortion = currentPortion === portionsCount ? pagesCount : currentPortion * portionSize;
   const pages = getPagesOfPortion(firstPageOfPortion, lastPageOfPortion);

   const handlePrevClick = () => {
      setCurrentPortion(portion => portion - 1);
      onPageChange(firstPageOfPortion - portionSize);
   };

   const handleNextClick = () => {
      setCurrentPortion(portion => portion + 1);
      onPageChange(firstPageOfPortion + portionSize);
   };

   const handlePageClick = (pageNum: number) => {
      if (pageNum !== Number(selectedPage)) onPageChange(pageNum);
   };

   useEffect(() => {
      if (shouldResetPagination.current) {
         if (selectedPage !== 1) onPageChange(1);
      } else {
         shouldResetPagination.current = true;
      }
   }, deps);

   return (
      <div className={`${s.root} ${customStyle}`}>
         <button
            disabled={currentPortion === 1}
            onClick={handlePrevClick}>
            <MdOutlineArrowBackIosNew />
         </button>
         <div className={s.pagesList}>
            {pages.map(p => (
               <button
                  key={p}
                  className={p === selectedPage ? s.activeBtn : ''}
                  onClick={() => handlePageClick(p)}
               >
                  {p}
               </button>
            ))}
         </div>
         <button
            disabled={currentPortion === portionsCount}
            onClick={handleNextClick}
         >
            <MdOutlineArrowForwardIos />
         </button>
      </div>
   );
});

export default Pagination;