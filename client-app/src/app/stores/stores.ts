import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import ResponsiveStore from "./responsiveStore";
import PetStore from "./petStore";


interface Store{
    userStore: UserStore;
    modalStore: ModalStore;
    responsiveStore: ResponsiveStore;
    petStore: PetStore;
}

export const store: Store ={
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    responsiveStore: new ResponsiveStore(),
    petStore: new PetStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}