import { FC } from 'react';

import s from './styles.module.scss';

import { ICategory } from '../../interfaces';
import { CategoryValues } from '../../utils/types';
import { categories } from '../../utils/consts';
import { usePopup } from '../../hooks';

interface Props {
   selectedCategory: ICategory;
   onCategoryChange: (category: ICategory) => void;
}

const Categories: FC<Props> = ({ selectedCategory, onCategoryChange }) => {
   const { show, setShow, ref } = usePopup();

   const handleShowToggle = () => setShow(show => !show);

   const handleCategoryChange = (category: ICategory) => {
      onCategoryChange(category);
      setShow(false);
   };

   return (
      <div ref={ref} className={`${s.categories} ${show ? s.categoriesActive : ''}`}>
         <button
            className={s.categoriesLabel}
            onClick={handleShowToggle}
         >
            {selectedCategory.value === CategoryValues.ALL ? 'Выберите категорию' : selectedCategory.name}
         </button>
         <div className={s.categoriesPopup}>
            <ul className={s.categoriesList}>
               {categories.map(category => (
                  <li
                     key={category.name}
                     className={`${s.categoriesItem} ${selectedCategory.value === category.value ? s.categoriesItemActive : ''}`}
                  >
                     <button onClick={() => handleCategoryChange(category)}>
                        {category.name}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Categories;