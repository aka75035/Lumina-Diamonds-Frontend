import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { updateUserDetails } from "../../../lib/User";

export default function ShippingAddressForm({ user, setUser }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobile: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                company: user.company || "",
                country: user.country || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                pinCode: user.pinCode || "",
                mobile: user.mobile || "",
                email: user.email || "",
            });
        }
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
                company: formData.company,
                country: formData.country,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pinCode: formData.pinCode,
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
                <h2 className="font-serif text-3xl text-[#181818]">
                    Shipping Information
                </h2>

                <p className="mt-2 text-gray-500">
                    Update your delivery address to ensure your jewellery arrives safely.
                </p>
            </div>

            {/* Form */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <div className="md:col-span-2">
                    <InputField
                        label="Company (Optional)"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Country / Region"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Street Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <InputField
                    label="Town / City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />

                <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />

                <InputField
                    label="PIN Code"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                />

                <InputField
                    label="Phone Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                    </label>

                    <input
                        value={formData.email}
                        readOnly
                        className="w-full rounded-2xl border border-[#ECE6DE] bg-gray-100 px-5 py-3 text-gray-500 outline-none"
                    />
                </div>

            </div>

            {/* Save Button */}

            <div className="flex justify-end">

                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-3 rounded-full bg-[#181818] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#B88A44] hover:shadow-lg"
                >
                    <Save size={18} />
                    Save Changes
                </button>

            </div>

        </div>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#ECE6DE] bg-[#F8F5F2] px-5 py-3 text-[#181818] outline-none transition-all duration-300 focus:border-[#B88A44] focus:bg-white"
            />
        </div>
    );
}