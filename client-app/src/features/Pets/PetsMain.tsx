import { observer } from "mobx-react-lite";
import { Container, Divider, Header, Icon, Table } from "semantic-ui-react";
import Navbar from "../../app/layout/Navbar";
import { useStore } from "../../app/stores/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons"; // Import the dog icon
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function PetsMain() {
    const { petStore, responsiveStore } = useStore();
    const {isMobile} = responsiveStore
    const { pets,  petloading, loadPets } = petStore;

    useEffect(() => {
        if (pets.length === 0) loadPets(); 
    }, [loadPets, pets.length]);

       if (petloading) return <LoadingComponent content='loading data' />

    return (
        <>
        <Container fluid>
            <Navbar />
            <Divider horizontal>
                <Header as="h1" className="industry">
                <FontAwesomeIcon icon={faDog} style={{ marginRight: "10px" }} />
                    {isMobile ? 'PETS' : 'C# TEMPLATE PETS PAGE'}
                </Header>
            </Divider>
        </Container>

        <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {pets.length > 0 ? (
                pets.map((pet) => (
                    <Table.Row key={pet.id}>
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