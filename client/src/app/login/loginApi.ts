import {HttpResponse, jsonHeaders} from "../utils/api";

const loginApi = async (email: string, password: string) => {
    const response = await window.fetch(`/api/auth`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({email, password})
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

export {loginApi}