import logo from './logo.svg';
import Home from './components/home/Home'
import Register from './components/register/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Login from './components/login/Login'
import AboutUs from './components/aboutus/AboutUs';
import Profile from './components/profile/Profile';
import Carts from './components/carts/Carts'
import Product from './components/products/Product'
import './App.css';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/Register',
          element:<Register />
        },
        {
          path:'/Login',
          element:<Login />
        },
        {
          path:'/Aboutus',
          element:<AboutUs />
        },
        {
          path:'/Profile',
          element:<Profile />,
          children:[
            {
              path:'Carts',
              element:<Carts />
            },
            {
              path:'Product',
              element:<Product />
            }
          ]
        }
      ]
    }

  ])
  return (
    <div className='text-info text-center' >
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
