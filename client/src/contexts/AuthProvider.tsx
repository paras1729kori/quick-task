import { createContext, useContext, useState, useEffect } from "react";
import type { UserType } from "../appTypes";

type AuthContextProps = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const defaultUser: UserType = {
  id: 0,
  name: "",
  email: "",
  jwtToken: "",
};

const AuthContext = createContext<AuthContextProps>({
  user: defaultUser,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>(() => {
    const storedUser = localStorage.getItem("quickTask");
    return storedUser ? JSON.parse(storedUser) : defaultUser;
  });

  useEffect(() => {
    if (user && user.id !== 0) {
      localStorage.setItem("quickTask", JSON.stringify(user));
    } else {
      localStorage.removeItem("quickTask");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
