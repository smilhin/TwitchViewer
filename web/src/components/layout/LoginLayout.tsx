import {Outlet} from "react-router-dom";

export function LoginLayout() {
    return (
        <>
            <main className="mx-auto max-w-6xl">
                <Outlet/>
            </main>
        </>
    );
}