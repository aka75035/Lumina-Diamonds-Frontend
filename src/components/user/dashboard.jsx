import userInfoIcon from "../../assets/userInfo.png";

export default function Dashboard({
    user,
}) {
    return (
        <div className="space-y-8">            

            {/* Profile Card */}
            <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8 shadow-sm">

                <div className="flex items-center gap-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5F2]">

                        <img
                            src={userInfoIcon}
                            alt="User"
                            className="h-8 w-8 object-contain"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-semibold text-[#181818]">
                            Personal Information
                        </h2>

                        <p className="text-gray-500">
                            Your registered account details.
                        </p>

                    </div>

                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="rounded-2xl bg-[#F8F5F2] p-5">
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="mt-2 text-lg font-semibold">
                            {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                                user?.userName ||
                                "-"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5F2] p-5">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="mt-2 text-lg font-semibold">
                            {user?.userName || "-"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5F2] p-5">
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="mt-2 text-lg font-semibold break-all">
                            {user?.email || "-"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5F2] p-5">
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="mt-2 text-lg font-semibold">
                            {user?.mobile || user?.phone || "-"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}