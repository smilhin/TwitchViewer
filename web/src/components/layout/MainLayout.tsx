import {Outlet} from "react-router-dom";
import {Nav} from "@/components/layout/Nav";

export function MainLayout() {
    return (
        <>
            <Nav/>
            <main className="mx-auto max-w-6xl px-6 py-8">
                <Outlet/>
            </main>
        </>
    );
}