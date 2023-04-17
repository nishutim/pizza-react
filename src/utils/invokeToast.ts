import { toast } from 'react-toastify';

const invokeToast = (text: string, type: 'success' | 'error') => {
   toast[type](text, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
   });
};

export default invokeToast;