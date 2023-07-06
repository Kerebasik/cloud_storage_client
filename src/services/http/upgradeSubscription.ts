import axiosApiInstance from "../../http/axios";
import { ISubscription } from "../../models/ISubscription";


const upgradeSubscription = (subscription:ISubscription)=>{
  return axiosApiInstance.post('/payment',{subscriptionId:subscription._id})
}

export default upgradeSubscription