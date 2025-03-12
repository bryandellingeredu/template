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

    loadPet = async (id: string) => {
        this.setPetLoading(true);
        let pet = this.petRegistry.get(id);
        if (pet){
            this.setPetLoading(false);
            return pet; 
        } 
        try {
            pet = await agent.Pets.details(id); // Fetch pet from API
            runInAction(() => {
                if (pet) {
                    this.petRegistry.set(pet.id, pet); 
                }
            });
            return pet; 
        } catch (error) {
            console.error(`Error loading pet with ID ${id}:`, error);
            toast.error("An error occurred while loading the pet");
        } finally {
            this.setPetLoading(false);
        }
    };

    updateInsertPet = async (pet: Pet) => {
        try{
            await agent.Pets.createUpdate(pet);
            runInAction(() => {
                this.petRegistry.set(pet.id, pet);
              });
        }catch (error) {
            console.error(`Error updating insert pet with id:  ${pet.id}:`, error);
            toast.error("An error occurred while saving the pet");
        }
    }

    deletePet = async (id: string) => {
        try{
           await agent.Pets.delete(id)
           runInAction(() => {
            this.petRegistry.delete(id);
          });
        }catch(error){
            console.error(`Errored deleting pet with id:  ${id}:`, error);
            toast.error("An error occurred while deleting the pet");
        }
     }
    
    

    

    setPetLoading = (state : boolean) => {
        this.petloading  = state;
      };


}