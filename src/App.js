import { Fragment, useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Todos from './components/Todo/Todos';
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/UI/Loader"

function App() {
  const [user, setUser] = useState(null);
  const [haveAccount, setHaveAccount] = useState(false);
  const [isLoading, setIsLaoding] = useState(false)

  useEffect(() => {
    setIsLaoding(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
      setIsLaoding(false)
    });
  }, [])


  const switchToSignInHandler = () => {
    setHaveAccount(true);
  }
  const switchToSignUpHandler = () => {
    setHaveAccount(false);
  }

  return (

    <Fragment>
      {isLoading && <Loader />}
      {!isLoading && <Fragment>
        {!user &&  !isLoading && !haveAccount && <SignUp isUserAlreadyHaveAccount={switchToSignInHandler} />}
        {!user && !isLoading && haveAccount && <SignIn switchToSignUp={switchToSignUpHandler} />}
        {user && !isLoading && <Todos switchToSignIn={switchToSignInHandler} />}

      </Fragment>}
    </Fragment>
  );
}

export default App;
