export default function AccountInfo({user, setUser, setFormData}){
    return(
        <div className="p-2 flex flex-col gap-4 text-sm justify-center">
            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">First Name</label>
                    <input value={user?.firstName} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Last Name</label>
                <input value={user?.lastName} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">User Name</label>
                <input value={user?.userName} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>


            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Phone</label>
                    <input value={user?.mobile}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Email</label>
                <input value={user?.email}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <div>
                <button>Save Changes</button>
            </div>
            
        </div>
    )
}