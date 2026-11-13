import {useState} from "react";
import {useCurrentUser} from "@/hooks/useCurrentUser.ts";
import {data} from "react-router-dom";

export function StreamerPage() {
    const params = new URLSearchParams(window.location.search);

    const [selectedStreamer, setSelectedStreamer] = useState(
        params.get("streamer") ?? ""
    );

    const {data: user} = useCurrentUser();

    return (
        <h1>Streamers Page</h1>
    );
}