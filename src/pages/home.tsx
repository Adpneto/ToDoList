// Home.tsx
import { useState, useEffect } from "react";
import { db, useAuth } from "@/firebaseConfig";
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Invites from "@/components/lists/invite";
import Lists from "@/components/lists/list";
import { useRecoilState } from "recoil";
import { listsAtom } from "@/hooks/listsAtom";
import { Invite, List } from "@/interfaces/ListData";

export default function Home() {
    const [newListName, setNewListName] = useState("");
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [listNames, setListNames] = useState<{ [key: string]: string }>({});

    const [lists, setLists] = useRecoilState(listsAtom);
    const { user } = useAuth();

    useEffect(() => {
        const unsubscribeLists = onSnapshot(collection(db, "listas"), (snapshot) => {
            const listsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as List[];

            const filteredLists = listsData.filter((list) =>
                list.owner === user?.uid || list.access.includes(user?.email!)
            );

            setLists(filteredLists);
        });

        return () => {
            unsubscribeLists();
        };
    }, [user]);

    useEffect(() => {
        const fetchListNames = async () => {
            const names: { [key: string]: string } = {};
            for (const invite of invites) {
                const listDoc = await getDoc(doc(db, "listas", invite.listId));
                if (listDoc.exists()) {
                    names[invite.listId] = (listDoc.data() as List).name;
                }
            }
            setListNames(names);
        };

        if (invites.length > 0) {
            fetchListNames();
        }
    }, [invites]);

    const addList = async () => {
        if (newListName.trim() !== "" && user) {
            await addDoc(collection(db, "listas"), {
                name: newListName,
                owner: user.uid,
                access: [user.email],
                items: [],
            });
            setNewListName("");
        }
    };

    const removeList = async (id: string) => {
        await deleteDoc(doc(db, "listas", id));
    };

    const acceptInvite = async (inviteId: string) => {
        const inviteDoc = doc(db, "convites", inviteId);
        const inviteData = await getDoc(inviteDoc);
        if (inviteData.exists()) {
            const { listId } = inviteData.data() as Invite;
            await updateDoc(doc(db, "listas", listId), {
                access: arrayUnion(user?.email),
            });
            await deleteDoc(inviteDoc);
        }
    };

    const rejectInvite = async (inviteId: string) => {
        await deleteDoc(doc(db, "convites", inviteId));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Home</h1>

            <div className="flex mb-4">
                <Input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Nova lista"
                />
                <Button onClick={addList}>Adicionar Lista</Button>
            </div>

            <Lists
                lists={lists}
                onViewItems={setSelectedList}
                onRemoveList={removeList}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
            />

            <Invites
                invites={invites}
                userEmail={user?.email ?? undefined}
                acceptInvite={acceptInvite}
                rejectInvite={rejectInvite}
                listNames={listNames}
            />
        </div>
    );
}
