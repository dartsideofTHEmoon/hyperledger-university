import {jsonHeaders} from "../utils/api";

const generateProposal = async (transactionProposal: any, certificate: string) => {
    const response = await window.fetch(`api/fabric/proposal`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({transactionProposal, certificate})
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

const sendSignedProposal = async (signedProposal: any) => {
    const response = await window.fetch(`api/fabric/signed-proposal`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({signedProposal})
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

const commitProposal = async (commit: any) => {
    const response = await window.fetch(`api/fabric/proposal/commit`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({commit})
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

const sendSignedTransaction = async (request: any, signedTransaction: any) => {
    const response = await window.fetch(`api/fabric/transaction/execute`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({request, signedTransaction})
    })
    return {
        status: response.status,
        data: await (response.json())
    }
}

export {generateProposal, sendSignedProposal, commitProposal, sendSignedTransaction}