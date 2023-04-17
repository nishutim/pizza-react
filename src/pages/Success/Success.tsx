import { useLocation, useNavigate } from 'react-router-dom';

import s from './styles.module.scss'

import RouteNames from '../../components/Router/routeNames';

import { Container, Page } from '../../components';

const Success = () => {
   const navigate = useNavigate();
   const { state } = useLocation();

   return (
      <Page>
         <Container customStyle={s.container}>
            <div>
               Спасибо, <span>{state.name}</span>, ваш заказ оформлен 🍕!
               Ожидайте звонка по номеру <span>{state.tel}</span> для уточнения деталей
            </div>
            <button onClick={() => navigate(RouteNames.HOME)}>
               Вернуться на главную
            </button>
         </Container>
      </Page>
   )
}

export default Success