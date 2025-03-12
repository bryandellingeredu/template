import { Button, ButtonGroup, Divider, Form, Header, Icon } from "semantic-ui-react";
import { useStore } from "../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";

interface Props{
    id: string;
}
export default observer(function SendEmailModal({id} : Props){
    const { modalStore, userStore} = useStore();
    const { closeModal } = modalStore;
    const {appUser} = userStore;
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
        if(appUser && appUser.email){
            setEmail(appUser.email)
        } 
    },[appUser]);

    const handleSubmit = async () => {
        setSubmitted(true);
        if(email){
            setSubmitting(true);
          try{
            await agent.Pets.sendEmail(id, email);
            toast.success("your email was sent");
            closeModal();
  
          }catch(e){
            toast.error("An error occurred while sending email");
            console.log(e);
            }finally{
             setSubmitting(false)
          }
        }
    }

    return(
        <>
            <Button
                floated="right"
                icon
                size="mini"
                color="black"
                compact
                onClick={() => closeModal()}
            >
                <Icon name="close" />
            </Button>

            <Divider horizontal>
                <Header as="h2" className="industry">
                    <Icon name="envelope" />
                    SEND EMAIL
                </Header>
            </Divider>

            <Form onSubmit={handleSubmit}>
            <Form.Input
            label={
              <label>
                <span style={{ color: "red", fontSize: "2em" }}>*</span> EMAIL
              </label>
            }
            placeholder="Enter a valid email"
            error={!email && submitted && { content: "Email is required" }}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
           <ButtonGroup floated="right" >
           <Button
              type="button"
              color="black"
              icon
              labelPosition="left"
              onClick={() => closeModal()}
            >
              <Icon name="arrow left" size="large" />
              CANCEL
            </Button>
            <Button
              type="submit"
              color="brown"
              icon
              labelPosition="right"
              loading={submitting}
            >
              <Icon name="envelope" size="large" />
              SEND
            </Button>
           </ButtonGroup>
        </Form>


        </>
    )

})