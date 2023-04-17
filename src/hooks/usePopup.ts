import { useEffect, useState, useRef } from 'react'

function usePopup<T extends HTMLElement = HTMLDivElement>() {
   const [show, setShow] = useState(false);
   const ref = useRef<T>(null);

   useEffect(() => {
      const listener = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setShow(false);

      document.addEventListener('click', listener);

      return () => document.removeEventListener('click', listener);
   }, [ref]);

   return { show, setShow, ref } as const;
}

export default usePopup