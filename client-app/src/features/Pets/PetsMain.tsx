import { observer } from "mobx-react-lite";
import { Button, Container, Divider, Header,  Table } from "semantic-ui-react";
import Navbar from "../../app/layout/Navbar";
import { useStore } from "../../app/stores/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons"; // Import the dog icon
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useNavigate } from "react-router-dom";

export default observer(function PetsMain() {
    const { petStore, responsiveStore } = useStore();
    const {isMobile} = responsiveStore
    const { pets,  petloading, loadPets } = petStore;
    const navigate = useNavigate();

    useEffect(() => {
        const redirectPath = localStorage.getItem("redirectToPath");
        if (redirectPath) {
          localStorage.removeItem("redirectToPath"); // Clear it from local storage
          navigate(`/${redirectPath}`); // Navigate to the stored path
        }
      }, [navigate]);

    useEffect(() => {
        if (pets.length === 0) loadPets(); 
    }, [loadPets, pets.length]);

    const handleNewPetButtonClick = () =>{
        navigate('/petform');
    }

    const handleRowClick = (id: string) => {
        navigate(`/petform/${id}`); 
    };

       if (petloading) return <LoadingComponent content='loading data' />

    return (
        <>
        <Container fluid>
            <Navbar />
            <div>
                <Button color="brown" icon="plus" content="NEW PET" floated="right" size='large' onClick={handleNewPetButtonClick} style={{'marginRight': '20px'}}/>
            </div>
            <Divider horizontal>
                <Header as="h1" className="industry">
                <FontAwesomeIcon icon={faDog} style={{ marginRight: "10px" }} />
                    {isMobile ? 'PETS' : 'C# TEMPLATE PETS PAGE'}
                </Header>
            </Divider>
        </Container>

        <Table celled striped selectable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {pets.length > 0 ? (
                pets.map((pet) => (
                    <Table.Row key={pet.id}
                    onClick={() => handleRowClick(pet.id)}
                    style={{ cursor: "pointer" }} 
                    >
                        <Table.Cell>{pet.name}</Table.Cell>
                        <Table.Cell>{pet.type}</Table.Cell>
                    </Table.Row>
                ))
            ) : (
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign="center">
                        No pets available.
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
        </Table>
</>
    );
});