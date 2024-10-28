import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDbQ7wEBzxTfbhjhedlAA9I7H1r0wiIehw",
  authDomain: "databasetests-73bec.firebaseapp.com",
  projectId: "databasetests-73bec",
  storageBucket: "databasetests-73bec.appspot.com",
  messagingSenderId: "948921071839",
  appId: "1:948921071839:web:1a36cfbd3b6c05ff6b916a"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

type AuthContextType = {
  user: User | null
  loading: boolean
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};