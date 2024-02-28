"use client"
import { InputField } from '@/components/form';
import Modal from '@/components/modal';
import { LoggedInContext } from '@/utils/authContext';
import { getWalletData, logout, payViaEmail } from '@/utils/services';
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const [wallet, setWallet] = useState<any>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [amount, setAmount] = useState(10)
    const [payerEmail, setPayerEmail] = useState("")
    const { loggedInState, setLoggedInState } = useContext(LoggedInContext)

    const subId = loggedInState.user?.user_metadata?.subId
    const getWallet = async () => {
        try {
            const result = await getWalletData({ subId: subId })
            const data = await result.json()
            console.log(subId)
            if (result.status === 200 && data.result.data[0].owner === subId)
                setWallet(data.result.data[0]);
            else
                setWallet(null)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMoney = async () => {
        try {
            const result = await payViaEmail({ subId, amount, payerEmail })
            const data = await result.json()
            console.log(data)
            if (data.status === "success") {
                toast.success("Payment successfull")
                window.open(data.data.paymentLink, "_blank")
                setOpen(false)
            }
            if (data.status === "failed")
                toast.error(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        const res = await logout()
        if (res.status === 200) {
            toast.success("Logout success")
            setLoggedInState({
                isLoggedIn: false,
                user: {},
                token: ""
            })
        }
    }
    useEffect(() => {
        getWallet()
    }, [loggedInState.isLoggedIn])
    return (
        <main className=" ">
            <nav className="bg-white border-b border-gray-300">
                <div className="flex justify-between items-center my-auto px-9">
                    <div className="">
                        <h1 className=" text-4xl font-bold py-5">Chimoney-Test</h1>
                    </div>
                </div>
            </nav>

            <div id="sideNav" className="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none">
                <ul className="p-4 space-y-4">
                    <li aria-label="dashboard"
                        className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-orange-300 to-pink-600">
                        <Link href="/dashboard" className="-mr-1 font-medium">Dashboard</Link>
                    </li>
                    <li className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <Link href="/dashboard">Wallet</Link>
                    </li>
                    <li className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <Link href="/dashboard">Transactions</Link>
                    </li>
                    <li className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <Link href="/dashboard">My account</Link>
                    </li>
                    {
                        loggedInState.isLoggedIn ?
                            <li onClick={handleLogout} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                                <Link href="/dashboard">Sign out</Link>
                            </li> :
                            <ul>
                                <li className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                                    <Link href="/auth/login">Login</Link>
                                </li>
                                <li className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                                    <Link href="/auth/signup">Signup</Link>
                                </li>
                            </ul>
                    }

                </ul>
            </div>

            <div className="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2">

                <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
                    <div className="flex items-center">
                        <i className="px-3 fas fa-search ml-1"></i>
                        <input type="text" placeholder="Search..." className="ml-3 focus:outline-none w-full" />
                    </div>
                </div>

                <div className="lg:flex gap-4 items-stretch">
                    <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
                        <div className="flex justify-center items-center space-x-5 h-full">
                            <div>
                                <p>Wallet</p>
                                <h2 className="text-4xl font-bold text-gray-600">{wallet?.balance}</h2>
                            </div>
                            <img src="https://www.emprenderconactitud.com/img/Wallet.png" alt="wallet"
                                className="h-24 md:h-20 w-38" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
                        <div className="flex flex-wrap justify-between h-full">
                            <div
                                onClick={() => setOpen(true)}
                                className="flex-1 cursor-pointer bg-gradient-to-r from-orange-300 to-pink-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                                <p className="text-white">Send</p>
                            </div>
                            {
                                isOpen &&
                                <Modal handleSubmit={handleSendMoney} setOpen={setOpen} title="Create a payment" >
                                    <InputField onChange={setAmount} value={amount} label="Amount" type="text" name="amount" id="amount" placeholder="" isRequired={true} />
                                    <InputField onChange={setPayerEmail} value={payerEmail} label="Payer email" type="email" name="email" id="email" placeholder="name@pay.com" isRequired={true} />
                                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                                    <div className=' text-center text-white pt-1'>
                                        <span>Pay via bank?</span>
                                    </div>
                                </Modal>
                            }
                            <div className="flex-1 bg-gradient-to-r from-orange-300 to-pink-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                                <i className="fas fa-hand-holding-usd text-white text-4xl"></i>
                                <p className="text-white">Recieve</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md my-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border-b-2 w-full">
                                    <h2 className="text-ml font-bold text-gray-600">Recent Transactions</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wallet?.transactions?.map((txn: any, key: number) => {
                                    return (
                                        <tr key={key} className="border-b w-full">
                                            <td className="px-4 py-2 text-left align-top w-1/2">
                                                <div>
                                                    <h2>Comercio</h2>
                                                    <p>{new Date(txn.meta.date._seconds).getFullYear() + "/" + new Date(txn.meta.date._seconds).getDate()}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                                <p><span>{txn?.amount}$</span></p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}