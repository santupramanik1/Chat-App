import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./login/LoginPage";
import {VerifyPage} from "./verify/VerifyPage";
import { ChatApp } from "./chat/ChatApp";
import { ProfilePage } from "./profile/ProfilePage";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage></LoginPage>,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/verify",
            element: <VerifyPage></VerifyPage>,
        },
        {
            path:"/chat",
            element:<ChatApp></ChatApp>
        },
        {
            path:"/profile",
            element:<ProfilePage></ProfilePage>
        }
    ]);
    return (
        <div className=" bg-[url('./src/assets/bgImage.svg')] bg-cover bg-center w-full h-screen ">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
};

export default App;
