import { createContext, useContext, useState } from "react";
import UserPool from "../aws/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

export const AuthCtx = createContext();

export function useAuth() {
  return useContext(AuthCtx);
}

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);

  async function getSession() {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
            setUser(user.signInUserSession.idToken.payload);
          }
        });
      } else {
        reject();
      }
    });
  }

  async function confirmAccount(email, code) {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.confirmRegistration(code, true, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async function authenticate(email, password) {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("Password Required", data);
          resolve(data);
        },
      });
    });
  }

  function logout() {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
      setUser(null);
      setAuthed(false);
    }
  }

  const providerValue = {
    authenticate,
    getSession,
    authed,
    setAuthed,
    user,
    setUser,
    logout,
    confirmAccount,
  };

  return <AuthCtx.Provider value={providerValue}>{children}</AuthCtx.Provider>;
}
