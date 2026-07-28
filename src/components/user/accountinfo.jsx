import { useState, useEffect } from "react";
import { Save, User, Phone, Mail, AtSign } from "lucide-react";
import { updateUserDetails } from "../../lib/User";

export default function AccountInfo({ user, setUser }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        mobile: "",
        email: "",
    });

    useEffect(() => {
        if (!user) return;

        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            userName: user.userName || "",
            mobile: user.mobile || "",
            email: user.email || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit() {
        try {
            const data = await updateUserDetails({
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobile: formData.mobile,
            });

            setUser(data.user);
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>
                <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                    LUMINA
                </p>

                <h2 className="mt-3 font-serif text-3xl text-[#181818]">
                    Account Information
                </h2>

                <p className="mt-2 text-gray-500">
                    Manage your personal details associated with your LUMINA account.
                </p>
            </div>

            {/* Form */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <InputField
                    icon={<User size={18} />}
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <InputField
                    icon={<User size={18} />}
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <InputField
                    icon={<AtSign size={18} />}
                    label="Username"
                    value={formData.userName}
                    readOnly
                />

                <InputField
                    icon={<Phone size={18} />}
                    label="Phone Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <div className="md:col-span-2">
                    <InputField
                        icon={<Mail size={18} />}
                        label="Email Address"
                        value={formData.email}
                        readOnly
                    />
                </div>

            </div>

            {/* Save Button */}

            <div className="flex justify-end">

                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-3 rounded-full bg-[#181818] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#B88A44] hover:shadow-xl"
                >
                    <Save size={18} />
                    Save Changes
                </button>

            </div>

        </div>
    );
}

function InputField({
    icon,
    label,
    name,
    value,
    onChange,
    readOnly = false,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                    readOnly
                        ? "border-[#ECE6DE] bg-gray-100"
                        : "border-[#ECE6DE] bg-[#F8F5F2] focus-within:border-[#B88A44] focus-within:bg-white"
                }`}
            >
                <span
                    className={
                        readOnly ? "text-gray-400" : "text-[#B88A44]"
                    }
                >
                    {icon}
                </span>

                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    className={`w-full bg-transparent outline-none ${
                        readOnly
                            ? "cursor-not-allowed text-gray-500"
                            : "text-[#181818]"
                    }`}
                />
            </div>
        </div>
    );
}