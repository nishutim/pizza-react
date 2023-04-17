import React, { FC } from 'react';

import s from './styles.module.scss';

interface Props {
  text?: string;
}

const Preloader: FC<Props> = React.memo(({ text = 'Загрузка...' }) => {
  return (
    <div className={s.preloader}>{text}</div>
  );
});

export default Preloader;