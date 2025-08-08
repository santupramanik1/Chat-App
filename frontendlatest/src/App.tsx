import {createBrowserRouter, RouterProvider} from "react-router-dom";
import  { LoginPage } from "./login/LoginPage";
import { VerifyPage } from "./verify/VerifyPage";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage></LoginPage>,
        },
        {
          path:"/verify",
          element:<VerifyPage></VerifyPage>
        }
    ]);
    return (
        <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-center w-full h-screen ">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
};

export default App;
