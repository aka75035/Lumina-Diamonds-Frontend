import { useState } from "react"
import BillingAddressForm from "./Addressform/billingaddress"
import ShippingAddressForm from "./Addressform/shippingaddress"

export default function Addresses({user,setUser, setFormData}){
    const [address, setAddress] = useState("Billing Address")
    return(
        <div className="">
            <div className="flex gap-2 text-lg">
                <button onClick={()=>{setAddress("Billing Address")}} className={`${address ==="Billing Address" ? "text-black font-bold border-b-2" : "text-gray-300"}`}>Billing Address</button>
                <button onClick={()=>{setAddress("Shipping Address")}} className={`${address ==="Shipping Address" ? "text-black font-bold border-b-2" : "text-gray-300"}`}>Shipping Address</button>
            </div>
            {address==="Billing Address" &&(
            <div className="border-1 mt-5 transition-all duration-300">
                <BillingAddressForm user={user} setUser={setUser} setFormData={setFormData}/>
            </div>)}
            {address==="Shipping Address" &&(
            <div className="border-1 mt-5 transition-all duration-300">
                <ShippingAddressForm user={user} setUser={setUser}/>
            </div>)}
        </div>
    )
}