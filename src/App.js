import './App.css';
import { useState } from 'react';
import './App.css';

//utils
import { Route, BrowserRouter, Routes, Navigate, Outlet } from 'react-router-dom';

//components
import SignUp from './pages/Account/SignUp';
import Login from './pages/Account/Login';
import DataProvider from './context/DataProvider';
import Home from './pages/Home';
import Header from './components/Header';
import { Container } from '@mui/material';
import FullView from './pages/FullView';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Footer from './components/Footer';



const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ?
    <>
      <Header />
      <Outlet />
      <Footer />

    </> : <Navigate replace to='/login' />
};
function App() {
  const [isAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/login" element={<Login setUserAuthenticated={setUserAuthenticated} />} />
              <Route path="/signin" element={<SignUp setUserAuthenticated={setUserAuthenticated} />} />



              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/' element={<Home />} />
              </Route>
              <Route path='/full/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/full/:id' element={<FullView />} />
              </Route>
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/create' element={<CreatePost />} />
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/update/:id' element={<UpdatePost />} />
              </Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </DataProvider>

    </>
  );
}

export default App;
