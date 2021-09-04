import React, { lazy, Suspense } from 'react';

const LazySquare = lazy(() => import('./Square'));

const Square = (value: number) => (
  <Suspense fallback={null}>
    <LazySquare />
  </Suspense>
);

export default Square;
