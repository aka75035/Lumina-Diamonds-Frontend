import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { updateUserDetails } from "../../../lib/User";

export default function BillingAddressForm({ user, setUser }) {
    const [billingAddress, setBillingAddress] = useState({
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
        if (!user) return;

        const billing =
            user.billingAddress?.length > 0
                ? user.billingAddress[0]
                : {};

        setBillingAddress({
            firstName: billing.firstName || user.firstName || "",
            lastName: billing.lastName || user.lastName || "",
            company: billing.company || user.company || "",
            country: billing.country || user.country || "",
            address: billing.address || user.address || "",
            city: billing.city || user.city || "",
            state: billing.state || user.state || "",
            pinCode: billing.pinCode || user.pinCode || "",
            mobile: billing.mobile || user.mobile || "",
            email: user.email || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit() {
        try {
            const data = await updateUserDetails(
                {
                    billingAddress,
                },
                setUser
            );

            setUser(data.user);
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <div className="space-y-8">

            {/* Heading */}

            <div>
                <h2 className="font-serif text-3xl text-[#181818]">
                    Billing Information
                </h2>

                <p className="mt-2 text-gray-500">
                    Update your billing details for invoices and secure checkout.
                </p>
            </div>

            {/* Form */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <InputField
                    label="First Name"
                    name="firstName"
                    value={billingAddress.firstName}
                    onChange={handleChange}
                />

                <InputField
                    label="Last Name"
                    name="lastName"
                    value={billingAddress.lastName}
                    onChange={handleChange}
                />

                <div className="md:col-span-2">
                    <InputField
                        label="Company (Optional)"
                        name="company"
                        value={billingAddress.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Country / Region"
                        name="country"
                        value={billingAddress.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Street Address"
                        name="address"
                        value={billingAddress.address}
                        onChange={handleChange}
                    />
                </div>

                <InputField
                    label="Town / City"
                    name="city"
                    value={billingAddress.city}
                    onChange={handleChange}
                />

                <InputField
                    label="State"
                    name="state"
                    value={billingAddress.state}
                    onChange={handleChange}
                />

                <InputField
                    label="PIN Code"
                    name="pinCode"
                    value={billingAddress.pinCode}
                    onChange={handleChange}
                />

                <InputField
                    label="Phone Number"
                    name="mobile"
                    value={billingAddress.mobile}
                    onChange={handleChange}
                />

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                    </label>

                    <input
                        value={billingAddress.email}
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