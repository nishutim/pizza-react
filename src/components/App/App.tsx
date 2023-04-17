import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import s from './styles.module.scss';

import { useFetchCartItems } from '../../hooks';

import { Header, Router } from '..';

const App: FC = () => {
  const { data: cartItems = [] } = useFetchCartItems();

  return (
    <div className={s.wrapper}>
      <div className={s.body}>
        <Header cartItems={cartItems} />
        <Router />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default App;
