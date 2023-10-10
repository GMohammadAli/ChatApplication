import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './pages/login_page';


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
  ]);
  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
