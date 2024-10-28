// Invites.tsx
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Invite {
    id: string;
    listId: string;
    userEmail: string;
    status: string;
}

interface Props {
    invites: Invite[];
    userEmail: string | undefined;
    acceptInvite: (inviteId: string) => Promise<void>;
    rejectInvite: (inviteId: string) => Promise<void>;
    listNames: { [key: string]: string };
}

const Invites: React.FC<Props> = ({ invites, userEmail, acceptInvite, rejectInvite, listNames }) => {
    return (
        <div className="flex flex-col">
            <h3 className="font-bold mt-4">Convites:</h3>
            <ul className="flex flex-col gap-2">
                {userEmail ? (
                    invites
                        .filter(invite => invite.userEmail === userEmail)
                        .map((invite) => (
                            <li key={invite.id} className="flex justify-between">
                                <span>{listNames[invite.listId]} - {userEmail}</span>
                                <div>
                                    <Button onClick={() => acceptInvite(invite.id)}>Aceitar</Button>
                                    <Button onClick={() => rejectInvite(invite.id)}>Rejeitar</Button>
                                </div>
                            </li>
                        ))
                ) : (
                    <span>Você não está logado.</span>
                )}
            </ul>
        </div>
    );
};

export default Invites