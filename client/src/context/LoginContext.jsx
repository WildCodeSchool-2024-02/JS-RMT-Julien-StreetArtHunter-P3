import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

// Fournisseur de contexte du panier
export function LoginProvider({ children }) {
  const [user, setUser] = useState();
  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
