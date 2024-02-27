"use client"

import { InputField } from "@/components/form";
import Modal from "@/components/modal";
import { LoggedInContext } from "@/utils/authContext";
import { login } from "@/utils/services";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loggedInState, setLoggedInState } = useContext(LoggedInContext)
    const handleLogin = async () => {
        try {
            const res = await login({ email, password })
            const result = await res.json()
            if (res.ok) {
                toast.success("Login Success")
                console.log(result)
                setLoggedInState({ ...loggedInState, user: result.user })
                router.push('/dashboard')
            }
            else toast.error(result.error.message)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(loggedInState)
        if (loggedInState?.isLoggedIn) router.push("/dashboard");
    }, [loggedInState?.token]);
    return (
        <div>
            <Modal handleSubmit={handleLogin} title="Login">
                <InputField onChange={setEmail} value={email} label="Email" type="email" name="email" id="email" placeholder="someone@domain.com" isRequired={true} />
                <InputField onChange={setPassword} value={password} label="Password" type="password" name="password" id="password" placeholder="" isRequired={true} />
                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </Modal>
        </div>
    )
}