import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "copyflow_users";
const SESSION_KEY = "copyflow_session";

interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "student";
}

function getStoredUsers(): StoredUser[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const userData = JSON.parse(session) as User;
        setUser(userData);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { error: "Aucun compte trouvé avec cet email." };
    }
    
    if (foundUser.password !== password) {
      return { error: "Mot de passe incorrect." };
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
    return {};
  };

  const register = async (email: string, password: string, name: string): Promise<{ error?: string }> => {
    const users = getStoredUsers();
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "Un compte existe déjà avec cet email." };
    }

    const newUser: StoredUser = {
      id: generateUserId(),
      email: email.toLowerCase(),
      password,
      name,
      role: "student",
    };

    saveUsers([...users, newUser]);

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
    return {};
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
