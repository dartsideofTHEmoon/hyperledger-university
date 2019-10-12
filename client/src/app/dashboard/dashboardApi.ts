import {jsonHeaders} from "../utils/api";

const queryCertificates = async () => {
    const response = await window.fetch(`/api/certificate`, {
        method: "GET",
        headers: jsonHeaders(),
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

export {queryCertificates}