import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);


export function LoginProvider({ children }) {
  const [user, setUser] = useState();
  const [streetArtToValidation, setStreetArtToValidation] = useState(null);

  
  return (
    <LoginContext.Provider value={{ user, setUser, streetArtToValidation, setStreetArtToValidation }}>
      {children}
    </LoginContext.Provider>
  );
}
LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
