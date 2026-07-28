import { afterLoginSync } from "../utils/cart-functions";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

export async function loginUser({email,setEmail,password,setPassword,setShowLogin,setLoggedIn,setUser,user}) {
    
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });
        
        const data = await response.json()
        console.log('data', data)
        
        if (data.success) {
            const profileResponse = await fetch(`${BASE_URL}/profile`,
                {
                    credentials: "include",
                }
            );
            const userData = await profileResponse.json();
            console.log(userData)
            
            setUser(userData.user);
            
            alert("Login Successful");
            
            setShowLogin(false);
            setLoggedIn(true);

            await afterLoginSync(userData.user);
            
            return(userData.user)

        } else {

            alert(userData.message);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong");

    }

}

export async function logoutUser() {
    try {
        const BASE_URL =
            import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/logout`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        return true;
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
        return false;
    }
}
    export async function checkLogin(setLoggedIn, setUser) {

        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

            async function doFetch(path,) {
            
                const url = `${BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

                const response = await fetch(url,
                    {
                    method: "GET",
                    credentials: "include"
                    }
                );

                if(response.ok) {

                    const user = await response.json();

                    setLoggedIn(true);
                    setUser(user.user);

                }
                else{
                    setLoggedIn(false);
                }
            }

            doFetch('/profile');

        } catch(err) {

        setLoggedIn(false);

        }

    }

    export async function signupUser({
    userName,
    email,
    password,
    setShowSignup,
    setLoggedIn,
    setUser,
    }) {
    try {

        const response = await fetch(`${BASE_URL}/user/signup`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
            userName,
            email,
            password,
            }),
        }
        );

        const data = await response.json();

        if (response.ok) {

        alert("Signup Successful");

        setShowSignup(false);

        return data;
        } else {
        alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
    }

    export async function updateUserDetails(formData) {
        try {
            const res = await fetch(`${BASE_URL}/user/update`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            return data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }