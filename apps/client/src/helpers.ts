export const search = (params: Record<string, string>) =>
  new URLSearchParams(params);

export const href = (url: string, params?: Record<string, string>) =>
  new URL(`${url}${params ? `?${search(params)}` : ''}`).href;

export const ws = (url: string, params?: Record<string, string>) =>
  new WebSocket(href(url, params));

export const isConnecting = (ws: WebSocket) =>
  ws.readyState === WebSocket.CONNECTING;

export const isOpen = (ws: WebSocket) => ws.readyState === WebSocket.OPEN;

export const isClosing = (ws: WebSocket) => ws.readyState === WebSocket.CLOSING;

export const isClosed = (ws: WebSocket) => ws.readyState === WebSocket.CLOSED;
