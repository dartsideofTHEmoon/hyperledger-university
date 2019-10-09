import {apiTokenStore} from "./apiStore";

export interface HttpResponse {
    status: number,
    data: any
}

export enum HttpStatus  {
    "OK" = 201
}

export const authHeaders = () => {
    return {
        'Authorization': `Bearer ${apiTokenStore.get()}` || ''
    }
}

export const jsonHeaders = () => {
    return new Headers(Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }, authHeaders()))
}

