import {MainLayout} from "@/components/layout/MainLayout.tsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/HomePage.tsx";
import {SettingsPage} from "@/pages/Settings.tsx";
import {WatchPage} from "@/pages/WatchPage.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage.tsx";
import {AccountPage} from "@/pages/AccountPage.tsx";
import {LoginLayout} from "@/components/layout/LoginLayout.tsx";
import {RequireAuth} from "@/components/twitchviewer-ui/RequireAuth.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";


function App() {

    return (
        <>
            <Routes>
                <Route element={<RequireAuth/>}>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/settings" element={<SettingsPage/>}/>
                        <Route path="/watch" element={<WatchPage/>}/>
                        <Route path="/account" element={<AccountPage/>}/>
                    </Route>
                </Route>
                <Route element={<LoginLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </>
    )
}

export default App
