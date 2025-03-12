import { Pet } from "../models/pet";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class PetStore{
    petRegistry = new Map<string, Pet>()
    petloading = false;

    constructor(){
        makeAutoObservable(this);
    }

    get pets() {
        return Array.from(this.petRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    loadPets = async () => {
        this.setPetLoading(true);
        if (this.petRegistry.size > 0){
            this.setPetLoading(false);
            return;
        }  
        try {
            const pets = await agent.Pets.list(); // Fetch pets from API
            runInAction(() => {
                pets.forEach(pet => this.petRegistry.set(pet.id, pet)); // Store in registry
            });
        } catch (error) {
            console.error("Error loading pets:", error);
            toast.error("An error occurred while loading pets");
        } finally {
            runInAction(() => this.setPetLoading(false)); // Ensure loading state is updated
        }
    };
    

    setPetLoading = (state : boolean) => {
        this.petloading  = state;
      };


}