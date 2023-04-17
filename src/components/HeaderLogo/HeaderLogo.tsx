import React, { FC } from 'react'
import { Link } from 'react-router-dom';

import s from './styles.module.scss';
import Logo from '../../assets/img/svg/logo.svg';

import routeNames from '../Router/routeNames';

const HeaderLogo: FC = React.memo(() => {
   return (
      <Link
         to={routeNames.HOME}
         className={s.logo}
      >
         <img src={Logo} alt="Logo" />
         <div>
            <b>REACT PIZZA</b>
            <span>самая вкусная пицца во вселенной</span>
         </div>
      </Link>
   );
});

export default HeaderLogo;