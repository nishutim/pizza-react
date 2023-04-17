import { useState, useEffect, useRef } from 'react';

const useIntersect = (initialVisibility: boolean) => {
   const [visible, setVisible] = useState(initialVisibility);
   const observableElementRef = useRef<HTMLDivElement>(null);

   const handler = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setVisible(entry.isIntersecting)
   };

   useEffect(() => {
      const observer = new IntersectionObserver(handler);
      if (observableElementRef.current) observer.observe(observableElementRef.current);

      return () => {
         if (observableElementRef.current) observer.unobserve(observableElementRef.current);
      }
   }, [observableElementRef]);

   return [visible, observableElementRef] as const;
}

export default useIntersect