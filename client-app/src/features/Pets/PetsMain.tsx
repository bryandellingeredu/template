import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";

export default observer(function PetsMain() {
    return (
        <Container fluid>
           <h1>Hello From Pets</h1>
        </Container>
    );
});