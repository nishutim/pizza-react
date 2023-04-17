import React, { FC, PropsWithChildren } from 'react';
import { motion as m } from "framer-motion";
import s from './styles.module.scss';

const Page: FC<PropsWithChildren> = React.memo(({ children }) => {
   return (
      <m.main
         className={s.page}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
      >
         {children}
      </m.main>
   );
});

export default Page;