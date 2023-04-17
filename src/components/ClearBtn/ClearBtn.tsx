import { FC } from 'react';
import { RxCross2 } from 'react-icons/rx';

import s from './styles.module.scss';

interface Props {
   customStyle?: string;
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClearBtn: FC<Props> = ({ customStyle = '', onClick }) => {
   return (
      <button
         className={`${s.clearBtn} ${customStyle}`}
         onClick={onClick}
      >
         <RxCross2 />
      </button>
   )
}

export default ClearBtn