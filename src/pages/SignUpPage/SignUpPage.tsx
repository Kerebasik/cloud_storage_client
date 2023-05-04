import React, { FC, Suspense } from 'react';
import SignUp from '../../components/SignUp/SignUp';
import Preloader from '../../components/Preloader/Preloader';

const SignUpPage:FC = ()=>{
  return(
    <>
      <head>
        <title>SignUp - {process.env.REACT_APP_NAME}</title>
      </head>
      <Suspense fallback={<Preloader/>}>
        <SignUp/>
      </Suspense>
    </>
  )
}

export default SignUpPage