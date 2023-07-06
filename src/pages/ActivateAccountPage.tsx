import React, {Suspense} from "react";
import Preloader from "../components/Preloader/Preloader";
const ActivateAccount = React.lazy(()=>import('src/components/pages/ActivateAccount/ActivateAccount'))

const ActivateAccountPage = ()=>{
  return(
    <>
      <Suspense fallback={<Preloader/>}>
        <ActivateAccount />
      </Suspense>
    </>
  )
}

export default ActivateAccountPage