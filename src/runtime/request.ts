import { createContext } from "preact";
import { useContext } from "preact/hooks";

export interface RequestContextValue<Data = any, State extends Record<PropertyKey, unknown> = any> {
    url: URL;
    params: Record<string, string | string[]>;
    state: State;
    data?: Data;
};

export const REQUEST_CONTEXT = createContext<RequestContextValue>({} as any);

export function useRequest<Data = any, State extends Record<PropertyKey, unknown> = any>(): RequestContextValue<Data, State> {
  return useContext(REQUEST_CONTEXT);
}
