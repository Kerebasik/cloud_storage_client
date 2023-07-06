import React, {Suspense} from "react";
import Preloader from "../components/Preloader/Preloader";
import BackButton from "../components/BackButton/BackButton";

const StorageOutlet = React.lazy(()=>import('src/components/pages/StorageOutlet/StorageOutlet'))
const StorageOutletPage = ()=>{
  return(
    <>
      <Suspense fallback={<Preloader/>}>
        <BackButton>
          <StorageOutlet/>
        </BackButton>
      </Suspense>
    </>
  )
}

export default StorageOutletPage