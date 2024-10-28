import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { auth, db } from "@/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditProfile from "../editProfile"

function getInitials(name: string = "", surname: string = "") {
  const firstInitial = name.charAt(0).toUpperCase() || "C"
  const secondInitial = surname.charAt(0).toUpperCase() || "N"
  return `${firstInitial}${secondInitial}`
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          setUser({
            username: userDoc.data().username,
            email: user.email,
            name: userDoc.data().name,
            surname: userDoc.data().surname,
            profilePicture: userDoc.data().profilePicture || null,
          })
        }
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  if (!user) {
    return null
  }

  const initials = getInitials(user.name ?? "", user.surname ?? "")

  function logOut() {
    auth.signOut()
    navigate('/')
  }

  return (
    <div>
      <EditProfile
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.username} />
                  ) : (
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.username}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user.profilePicture ? (
                      <AvatarImage src={user.profilePicture} alt={user.username} />
                    ) : (
                      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                  <BadgeCheck />
                  Editar Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Cobrança
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notificações
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut}>
                <LogOut />
                Sair da conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}