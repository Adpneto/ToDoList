import { useState, useEffect } from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Verificar autenticação quando o componente monta
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // Usuário autenticado
      } else {
        setIsAuthenticated(false); // Usuário não autenticado
      }
    });

    // Limpa o listener quando o componente desmonta
    return () => unsubscribe();
  }, []);

  // Renderizar apenas quando souber o estado de autenticação (evita piscar layouts)
  if (isAuthenticated === null) {
    return <div>Carregando...</div>; // Ou qualquer spinner que você queira
  }

  return (
    <SidebarProvider>
      {isAuthenticated ? (
        <>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger className="m-2 absolute" />
            <ModeToggle />
            <div className="w-full flex justify-center">
              <div className="w-[1440px] m-5">
                {children}
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <main className="w-full">
            <ModeToggle />
            <div className="w-full flex justify-center">
              <div className="w-full">
                {children}
              </div>
            </div>
          </main>
        </>
      )}
    </SidebarProvider>
  );
}