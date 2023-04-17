const getPagesOfPortion = (firstPage: number, lastPage: number) => {
   const pages: number[] = [];
   for (let i = firstPage; i <= lastPage; i++) {
      pages.push(i);
   }
   return pages;
};

export default getPagesOfPortion;