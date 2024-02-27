
const BASE_URL = "http://localhost:8000/"

export const getWalletData = async (body: any): Promise<Response> => {
    const res = await fetch(BASE_URL + 'getWallet', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return res
}

export const login = async (body: any) => {
    const res = await fetch(BASE_URL + 'login', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res
}

export const signup = async (body: any) => {
    const res = await fetch(BASE_URL + 'register',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
    )
    return res
}
export const pay = async (body: any) => {
    const res = await fetch(BASE_URL + 'request', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return res
}

export const logout = async () => {
    return await fetch(BASE_URL + "logout", {
        method: "POST",
        credentials: "include"
    })
}

export const getMe = async (body: any): Promise<Response> => {
    const user = await fetch(BASE_URL + "getUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return user
}