export function parseUserId(payload: JwtPayload) {
    const sub = payload.sub
    return sub.replace(/^aid:/, '');
}

export interface JwtPayload {
    sub: string
}

export function formatUserId(userId: string) {
    return `aid:${userId}`
}
