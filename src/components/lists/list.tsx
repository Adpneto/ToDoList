import { useState } from "react";
import { db } from "@/firebaseConfig";
import { updateDoc, arrayUnion, arrayRemove, doc, addDoc, collection } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Item {
    id: string;
    text: string;
}

interface List {
    id: string;
    name: string;
    owner: string;
    access: string[];
    items: Item[];
}

interface Props {
    lists: List[];
    onViewItems: (list: List) => void;
    onRemoveList: (id: string) => void;
    selectedList: List | null;
    setSelectedList: (list: List | null) => void;
}

const Lists: React.FC<Props> = ({ lists, onViewItems, onRemoveList, selectedList, setSelectedList }) => {
    const [newItemText, setNewItemText] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");

    const addItemToList = async (listId: string) => {
        if (newItemText.trim() !== "" && selectedList) {
            const newItem: Item = { id: new Date().toISOString(), text: newItemText };

            const itemExists = selectedList.items.some((item) => item.text === newItemText);
            if (!itemExists) {
                await updateDoc(doc(db, "listas", listId), {
                    items: arrayUnion(newItem),
                });
                setNewItemText("");
            } else {
                alert("Item já existe na lista!");
            }
        }
    };

    const removeItemFromList = async (listId: string, itemId: string) => {
        if (selectedList) {
            const itemToRemove = selectedList.items.find((item) => item.id === itemId);
            if (itemToRemove) {
                await updateDoc(doc(db, "listas", listId), {
                    items: arrayRemove(itemToRemove),
                });
            }
        }
    };

    const inviteUserToList = async (listId: string) => {
        if (inviteEmail.trim() !== "") {
            await addDoc(collection(db, "convites"), {
                listId: listId,
                userEmail: inviteEmail,
                status: "pendente",
            });
            setInviteEmail("");
        } else {
            alert("Por favor, insira um e-mail válido!");
        }
    };

    return (
        <div className="flex flex-col mb-4">
            <h3 className="font-bold mb-2">Listas:</h3>
            <ul className="flex flex-col gap-2">
                {lists.map((list) => (
                    <li className="flex items-center justify-between gap-2" key={list.id}>
                        <span className="font-bold text-lg">{list.name}</span>
                        <div className="flex items-center">
                            <Button onClick={() => onViewItems(list)}>Ver Itens</Button>
                            <X className="font-bold text-xl text-red-600" onClick={() => onRemoveList(list.id)} />
                        </div>
                    </li>
                ))}
            </ul>

            {selectedList && (
                <div className="border-t mt-4 pt-4">
                    <h2 className="font-bold text-xl mb-2">{selectedList.name}</h2>
                    <div className="flex mb-4">
                        <Input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="Novo item"
                        />
                        <Button onClick={() => addItemToList(selectedList.id)}>Adicionar Item</Button>
                    </div>
                    <h3 className="font-bold mb-2">Itens:</h3>
                    <ul className="flex flex-col gap-2">
                        {selectedList.items.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.text}</span>
                                <X className="font-bold text-xl text-red-600" onClick={() => removeItemFromList(selectedList.id, item.id)} />
                            </li>
                        ))}
                    </ul>

                    {/* Adicionando o campo para convidar usuários */}
                    <div className="flex mt-4">
                        <Input
                            type="text"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="Convidar usuário pelo e-mail"
                        />
                        <Button onClick={() => inviteUserToList(selectedList.id)}>Convidar</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lists;
