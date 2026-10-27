import type {User} from "@twitchviewer/shared";

type Credentials = { name: string; password: string };

export async function errorMessage(response: Response, fallback: string): Promise<string> {
    const data = await response.json().catch(() => null);
    return data?.error ?? fallback;
}

export async function login(body: Credentials): Promise<User> {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await errorMessage(response, "Login failed"));
    return response.json();
}

export async function signup(body: Credentials): Promise<User> {
    const response = await fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await errorMessage(response, "Signup failed"));
    return response.json();
}

export async function logout(): Promise<void> {
    await fetch("/api/logout", {method: "POST"});
}

export async function getMe(): Promise<User | null> {
    const response = await fetch("/api/me");
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("Could not load current user");
    return response.json();
}