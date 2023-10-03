import { Fragment, useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Todos from './components/Todo/Todos';
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [haveAccount, setHaveAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
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
      {!user && !haveAccount && <SignUp isUserAlreadyHaveAccount={switchToSignInHandler} />}
      {!user && haveAccount && <SignIn switchToSignUp={switchToSignUpHandler} />}
      {user && <Todos switchToSignIn={switchToSignInHandler} />}

    </Fragment>
  );
}

export default App;
