import { Outlet, ScrollRestoration } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ModalContainer from "../common/modals/ModalContainer";
import { useStore } from "../stores/stores";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";


function App() {
  const { userStore } = useStore();

  // the part below handles if the user refreshes the page and gets the token from local
  // storage to auto log them back in
  // it also looks for a query string called redirecttopath so that you can go directly to a page from outside the app
  // you just need to use it like apps.armywarcollege.edu/template?redirecttopath=mypage

  useEffect(() => {
    // Always look for the 'redirecttopath' query parameter
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get('redirecttopath');

    if (redirectPath) {
      // Save the redirect path to local storage
      localStorage.setItem('redirectToPath', redirectPath);

      // Optionally, clean up the query string
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    if (userStore.token) {
      // If the user is logged in, fetch their user details
      userStore
        .getUser()
        .catch((error) => {
          console.error("Error loading user:", error);
          userStore.logout(); // Clear token if fetching user fails
        })
        .finally(() => {
          userStore.setAppLoaded(true);
        });
    } else {
      // If the user is not logged in
      userStore.setAppLoaded(true); // Mark the app as loaded
    }
  }, [userStore]);

  if (!userStore.appLoaded) return <LoadingComponent content="Loading App..." />;


  return (
    <>
      <ScrollRestoration />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalContainer />
      <Outlet />
    </>
  )
}

export default observer(App);
