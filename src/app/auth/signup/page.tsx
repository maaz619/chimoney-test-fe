"use client"

import { InputField } from "@/components/form";
import Modal from "@/components/modal";
import { LoggedInContext } from "@/utils/authContext";
import { signup } from "@/utils/services";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { loggedInState, setLoggedInState } = useContext(LoggedInContext)
    const handleSignup = async () => {
        try {
            const res = await signup({ email, password, name })
            const result = await res.json()
            console.log(res)
            if (res.ok) {
                if (typeof window !== 'undefined')
                    localStorage.setItem('token', result?.doc.session.access_token)
                setLoggedInState({
                    isLoggedIn: true,
                    user: result?.doc.user,
                    token: result?.doc.session.access_token
                })
                router.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (loggedInState?.isLoggedIn) router.push("/dashboard");
    }, [loggedInState.token])
    return (
        <div>
            <Modal handleSubmit={handleSignup} title="Signup">
                <InputField onChange={setName} value={name} label="Name" type="name" name="name" id="name" placeholder="Jhon Doe" isRequired={true} />
                <InputField onChange={setEmail} value={email} label="Email" type="email" name="email" id="email" placeholder="someone@domain.com" isRequired={true} />
                <InputField onChange={setPassword} value={password} label="Password" type="password" name="password" id="password" placeholder="" isRequired={true} />
                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </Modal>
        </div>
    )
}