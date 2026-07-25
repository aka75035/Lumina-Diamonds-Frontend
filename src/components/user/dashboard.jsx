import ordersIcon from '../../assets/checklist.png';
import addressIcon from '../../assets/checklist.png';
import editIcon from '../../assets/edit.png';
import userInfoIcon from "../../assets/userInfo.png";
export default function Dashboard({user, setUser, setTab, accountInfo}){
    return(
        <div className="flex flex-col lg:w-[1000px] border-1 p-5 text-sm ">
            <div className="relative flex items-center bg-gray-100">
                <div className='flex'>
                    <img src={ordersIcon} alt='orders' className='w-18'/>
                    <div className='p-2 flex flex-col justify-center'>
                        <span className='font-bold'>Your current orders </span>
                        <span>Track and manage all your past and current orders in one place.</span>
                    </div>
                </div>
                <button onClick={()=>{setTab(accountInfo[1])}} className="absolute rounded-full right-0 p-2 border-2 
                    border-gray-500 text-sm hover:bg-gray-200 
                    transition-all duration-300">View Order History</button>
            </div>
            <div className='flex gap-6 mt-10 '>
                <div className='p-2 w-1/2 relative border-2 border-gray-500 rounded-md shadow-lg'>
                    <div className='flex mb-2'>
                        <img src={addressIcon} alt='address' className='w-18'/>
                        <div className='p-2 flex flex-col justify-center w-[220px]'>
                            <span className='font-bold'>Saved Billing Address</span>
                            <span>Manage your billing address anytime.</span>
                        </div>
                        <button onClick={()=>{setTab(accountInfo[2])}} 
                            className="absolute right-2 top-4 rounded-full py-2 px-4 border-2 
                            border-gray-500 text-sm hover:bg-gray-200 transition-all duration-300">Add/Edit</button>
                    </div>
                    <div className='relative overflow-hidden w-full h-10 bg-gray-100'>
                        <img src={editIcon} alt='add/edit' className=' absolute top-2.5 right-2 w-5' />
                    </div>
                </div>
                <div className='p-2 w-1/2 relative border-2 border-gray-500 rounded-md shadow-lg'>
                    <div className='flex mb-2'>
                        <img src={userInfoIcon} alt='userInfo' className='w-18 h-19'/>
                        <div className='p-2 flex flex-col justify-center w-[240px]'>
                            <span className='font-bold'>Manage your account</span>
                            <span>Stay in control of your profile and login preferences.</span>
                        </div>
                        <button onClick={()=>{setTab(accountInfo[3])}} 
                            className="absolute right-2 top-4 rounded-full py-2 px-4 border-2
                            border-gray-500 text-sm hover:bg-gray-200 transition-all duration-300">Edit Profile</button>
                    </div>
                    <div className='w-full'>
                        <div className="flex gap-2">
                            <label className="font-bold">User Name:</label>
                            <label className="">{user?.userName}</label>
                        </div>
                        <div className="flex gap-2">
                            <label className="font-bold">Email:</label>
                            <label className="">{user?.email}</label>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}