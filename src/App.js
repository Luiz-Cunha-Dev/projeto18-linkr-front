import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './global/globalStyle';
import userContext from './contexts/userContexts';
import PrivatePage from './pages/privatePage';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Header from './components/header';


export default function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <GlobalStyle />
      <userContext.Provider value={{ user, setUser }}>
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route
              path='/timeline'
              element={
                <PrivatePage>
                  <h1>Timeline</h1>
                </PrivatePage>
              }
            />
            <Route
              path='/user'
              element={
                <PrivatePage>
                  <h1>UserPage</h1>
                </PrivatePage>
              }
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
   </>
  );
}
