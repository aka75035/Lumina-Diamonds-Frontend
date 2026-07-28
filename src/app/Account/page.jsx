import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Dashboard from "../../components/user/dashboard";
import OrderHistory from "../../components/user/orderhistory";
import Addresses from "../../components/user/address";
import AccountInfo from "../../components/user/accountinfo";

import { logoutUser } from "../../lib/User";

import {
    LayoutDashboard,
    Package,
    MapPin,
    User,
    LogOut,
} from "lucide-react";

export default function Account() {

    const navigate = useNavigate();

    const accountInfo = [
        "Dashboard",
        "Orders",
        "Addresses",
        "Account Details",
    ];

    const tabs = [
        {
            title: "Dashboard",
            desc: "Overview",
            icon: LayoutDashboard,
        },
        {
            title: "Orders",
            desc: "Purchase history",
            icon: Package,
        },
        {
            title: "Addresses",
            desc: "Saved locations",
            icon: MapPin,
        },
        {
            title: "Account Details",
            desc: "Profile settings",
            icon: User,
        },
    ];

    const { user, setUser } = useAuth();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [tab, setTab] = useState(accountInfo[0]);

    async function handleLogout() {
        const success = await logoutUser();

        if (!success) return;

        setUser(null);

        localStorage.removeItem("cart");

        navigate("/");
    }

    return (

        <div className="min-h-screen bg-[#F8F5F2]">

            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">

                {/* Hero */}

                <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2] p-5 sm:p-8 lg:p-10">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        <div>

                            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                                LUMINA
                            </p>

                            <h1 className="mt-4 break-words font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181818]">

                                Welcome,

                                <span className="text-[#B88A44]">

                                    {" "}

                                    {user?.firstName || user?.userName}

                                </span>

                            </h1>

                            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">

                                Thank you for choosing LUMINA.

                                Your account keeps your orders,

                                addresses and personal details

                                safely in one place.

                            </p>

                        </div>

                        {/* Desktop Logout */}

                        <button

                            onClick={handleLogout}

                            className="hidden lg:flex items-center gap-2 rounded-full border border-[#ECE6DE] bg-white px-6 py-3 transition-all duration-300 hover:border-[#B88A44] hover:shadow-md"

                        >

                            <LogOut size={18} />

                            Logout

                        </button>

                    </div>

                </div>

                {/* Navigation */}

                                <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">

                    {tabs.map((item) => {

                        const Icon = item.icon;

                        return (

                            <button
                                key={item.title}
                                onClick={() => setTab(item.title)}
                                className={`
                                    group
                                    rounded-2xl sm:rounded-3xl
                                    border
                                    p-4 sm:p-6
                                    text-left
                                    transition-all
                                    duration-300

                                    ${
                                        tab === item.title
                                            ? "border-black bg-black text-white shadow-xl"
                                            : "border-[#ECE6DE] bg-white hover:-translate-y-1 hover:border-[#B88A44] hover:shadow-lg"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        flex h-11 w-11 sm:h-14 sm:w-14
                                        items-center justify-center
                                        rounded-2xl
                                        transition-all
                                        duration-300

                                        ${
                                            tab === item.title
                                                ? "bg-white/10"
                                                : "bg-[#F8F5F2] group-hover:bg-[#FFF7EC]"
                                        }
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        className={
                                            tab === item.title
                                                ? "text-white"
                                                : "text-[#B88A44]"
                                        }
                                    />

                                </div>

                                <h3 className="mt-4 sm:mt-6 text-sm sm:text-lg font-semibold leading-6">
                                    {item.title}
                                </h3>

                                <p
                                    className={`mt-1 sm:mt-2 text-xs sm:text-sm leading-5 ${
                                        tab === item.title
                                            ? "text-gray-300"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {item.desc}
                                </p>

                            </button>

                        );

                    })}

                </div>

                {/* Content */}

                <div className="mt-6 sm:mt-10 rounded-2xl sm:rounded-[32px] border border-[#ECE6DE] bg-white p-4 sm:p-6 lg:p-10">

                    {tab === accountInfo[0] && (
                        <Dashboard
                            user={user}
                            setUser={setUser}
                            setTab={setTab}
                            accountInfo={accountInfo}
                        />
                    )}

                    {tab === accountInfo[1] && (
                        <OrderHistory
                            selectedOrder={selectedOrder}
                            setSelectedOrder={setSelectedOrder}
                        />
                    )}

                    {tab === accountInfo[2] && (
                        <Addresses
                            user={user}
                            setUser={setUser}
                        />
                    )}

                    {tab === accountInfo[3] && (
                        <AccountInfo
                            user={user}
                            setUser={setUser}
                        />
                    )}

                </div>

                {/* Mobile Logout */}

                <div className="mt-6 lg:hidden">

                    <button
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            px-6
                            py-4
                            text-sm
                            font-medium
                            text-red-600
                            transition-all
                            duration-300
                            hover:bg-red-100
                            active:scale-[0.98]
                        "
                    >

                        <LogOut size={20} />

                        Logout

                    </button>

                </div>
                            </div>

        </div>

    );
}