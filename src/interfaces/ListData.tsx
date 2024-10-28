export interface Item {
    id: string;
    text: string;
}

export interface List {
    id: string;
    name: string;
    owner: string;
    access: string[];
    items: Item[];
}

export interface Invite {
    id: string;
    listId: string;
    userEmail: string;
    status: string;
}
