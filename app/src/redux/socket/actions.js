

export const wsConnect = (host) => ({ type: 'WS_CONNECT', host });
export const wsDisconnect = (host) => ({ type: 'WS_DISCONNECT', host });
