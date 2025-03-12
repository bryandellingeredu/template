import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, ButtonGroup, Container, Divider, Form, Header, Icon, Popup } from "semantic-ui-react";
import Navbar from "../../app/layout/Navbar";
import { toast } from "react-toastify";


export default observer(function PetForm() {
    const { id } = useParams();
    const { petStore,} = useStore();
    const { petloading, loadPet, updateInsertPet, deletePet } = petStore;
    const navigate = useNavigate();
    const [petId] = useState(id || uuidv4());
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [saving, setSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if(!petloading){
        const fetchPet = async () => {
            if (id) {
                const pet = await loadPet(id); // Await the async call
                if (pet) {
                    setName(pet.name);
                    setType(pet.type);
                }
            }
        };

        fetchPet();
      }
    }, [id, loadPet, petloading]);

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDelete = async() => {
        setDeleting(true)
        try{
          await deletePet(id!);
          setDeleting(false)
          navigate('/pets');
        }catch(error){
          console.log(error);
          toast.error("An error occurred deleting the attachment");
        }
        finally{
          setOpen(false);
          setDeleting(false);
        }
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if(name && type){
            try{
             setSaving(true)
             await updateInsertPet({id: petId, name, type})
             setSaving(false);
             navigate('/pets');
            }catch(e){
                toast.error("An error occurred while saving the pet");
               
                console.log(e);
            }finally{
                setSaving(false)
            }
        }

    }
    if (petloading) return <LoadingComponent content='loading data' />

    return (
     <Container fluid>
             <Navbar />

     <Divider horizontal>
        <Header as="h1" className="industry">
          {
           id  ?   <Icon name="pencil" /> :   <Icon name="plus" />
          }
        
         {id ? 'UPDATE PET' : 'ADD PET' } 
        </Header>
        </Divider>

        <Container>

        <Form onSubmit={handleSubmit}>
        <Form.Input
            label={
              <label>
                <span style={{ color: "red", fontSize: "2em" }}>*</span> PET NAME
              </label>
            }
            placeholder="Enter pet name"
            error={!name && submitted && { content: "Name is required" }}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />

         <Form.Input
            label={
              <label>
                <span style={{ color: "red", fontSize: "2em" }}>*</span> PET TYPE
              </label>
            }
            placeholder="Enter pet type"
            error={!type && submitted && { content: "Type is required" }}
            value={type} 
            onChange={(e) => setType(e.target.value)} 
          />
           <ButtonGroup floated="right" size="big">
           <Button
              type="button"
              color="black"
              icon
              labelPosition="left"
              onClick={() => navigate('/pets')}
            >
              <Icon name="arrow left" size="large" />
              CANCEL
            </Button>
          

              <Popup
                  trigger={
                          <Button icon color='red' type='button'   labelPosition="right" onClick={() => setOpen(true)}  loading={deleting}>
                            <Icon name='x' />
                            DELETE
                          </Button>
                         }
                           on="click"
                          open={open}
                          onClose={() => setOpen(false)}
                          position="top center"
                        content={
                        <div>
                           <p>Are you sure you want to delete this pet</p>
                              <Button color="red" onClick={handleDelete}>
                                Yes
                              </Button>
                            <Button color="grey" onClick={handleCancel}>
                               No
                             </Button>
                        </div>
                        }
                        />

           <Button
              type="submit"
              color="brown"
              icon
              labelPosition="right"
              loading={saving}
            >
              <Icon name="save" size="large" />
              SAVE
            </Button>
           </ButtonGroup>
        </Form>

        </Container>
        </Container>
       
    );
});