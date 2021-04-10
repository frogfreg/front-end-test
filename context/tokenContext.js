import { useContext, createContext } from "react";

export const TokenContext = createContext();
function useToken() {
  return useContext(TokenContext);
}

export default useToken;
