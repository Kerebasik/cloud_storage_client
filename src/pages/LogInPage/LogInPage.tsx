

import React, { FC, Suspense } from 'react';
import LogIn from 'src/components/LogIn/LogIn';
import Preloader from 'src/components/Preloader/Preloader';

const LogInPage:FC=()=>{
  return(
    <>
      <head>
        <title>LogIn - {process.env.REACT_APP_NAME}</title>
      </head>
      <Suspense fallback={<Preloader/>}>
        <LogIn/>
      </Suspense>
    </>
  )
}

export default LogInPage