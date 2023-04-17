import React, { FC, PropsWithChildren } from 'react';
import s from './styles.module.scss';

interface Props {
   customStyle?: string;
};

const Container: FC<PropsWithChildren<Props>> = React.memo(({ customStyle = '', children }) => {
   return (
      <div className={`${s.container} ${customStyle}`}>
         {children}
      </div>
   );
});

export default Container;