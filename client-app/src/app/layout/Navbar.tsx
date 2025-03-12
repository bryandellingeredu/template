import { observer } from 'mobx-react-lite';
import { Dropdown, Icon, Menu, MenuItem } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/stores';
export default observer(function Navbar(){

      const { userStore, responsiveStore } = useStore();
      const {isMobile} = responsiveStore
      const navigate = useNavigate();

    

      useEffect(() => {
        if (!userStore.loadingUser && userStore.appLoaded) {
            if (!userStore.appUser) {
              userStore.logout(); 
                navigate("/"); // Redirect only when user loading is complete and no user is found
            }
        }
    }, [userStore.loadingUser, userStore.appLoaded, userStore.appUser, navigate]);

    const handleLogout = () => {
        userStore.logout(); // Clear user, token, and redirect path
        navigate('/'); // Redirect to login page
    };

    if(userStore.loadingUser) return(<LoadingComponent content='loading data...'/>)
    return(
      <Menu inverted className='navbar'>
        <MenuItem>
        <img src="/template/star.svg" alt="Logo"  />
        </MenuItem>
        <MenuItem>
          {!isMobile && 
          <h2 className='industry'>TEMPLATE</h2>
          }
        </MenuItem>
        <MenuItem position="right">
        <Menu.Menu >
       
        <Dropdown
  trigger={
    <span style={{ color: 'white' }}>
      <Icon name="user" />
      <span className="gilite">{userStore.appUser?.email}</span>
    </span>
  }
  pointing="top right"
  className="user-dropdown"
>
  <Dropdown.Menu>
    {userStore.appUser && (
      <>
        {userStore.appUser.email && (
          <Dropdown.Item text={`Email: ${userStore.appUser.email}`} disabled />
        )}
        {userStore.appUser.loggedInWith && (
          <Dropdown.Item text={`User Logged In Using: ${userStore.appUser.loggedInWith}`} disabled />
        )}
        {userStore.appUser.loggedInWith && (
          <Dropdown.Item text={`Compass Person Id: ${userStore.appUser.personId}`} disabled />
        )}
      </>
    )}
    <Dropdown.Divider />

    <Dropdown.Item
      text="Logout"
      icon="sign-out"
      onClick={handleLogout}
    />
  </Dropdown.Menu>
</Dropdown>
      </Menu.Menu>
      </MenuItem>
      </Menu>
    );
});