import '@videojs/react/video/skin.css';
import {Video, VideoPlayer, VideoSkin} from "@videojs/react/video";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList
} from "@/components/ui/combobox.tsx";
import {useCurrentUser} from "@/hooks/useCurrentUser.ts";
import {useState} from "react";

const recordings = [""];

export function WatchPage() {
    const params = new URLSearchParams(window.location.search);
    const [selectedStreamer, setSelectedStreamer] = useState(
        params.get("streamer") ?? ""
    );
    const [selectedRecording, setSelectedRecording] = useState(
        params.get("file") ?? ""
    );


    const {data: user} = useCurrentUser();
    const streamers = user?.streamers;
    return (
        <div className={"flex flex-col gap-3"}>
            <div className="flex flex-row gap-2 w-full max-w-sm">
                <Combobox items={streamers} value={selectedStreamer}
                          onValueChange={(value) => setSelectedStreamer(value ?? "")}
                >
                    <ComboboxInput placeholder={"Select a streamer..."}/>
                    <ComboboxContent>
                        <ComboboxEmpty>No streamers found.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
                <Combobox items={recordings} value={selectedRecording}
                          onValueChange={(value) => setSelectedRecording(value ?? "")}>
                    <ComboboxInput placeholder={"Select a recording..."}/>
                    <ComboboxContent>
                        <ComboboxEmpty>No recordings found.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>

            <VideoPlayer>
                <VideoSkin style={{width: '100%', aspectRatio: '16 / 9'}}>
                    <Video src={""} playsInline/>
                </VideoSkin>
            </VideoPlayer>
        </div>);
}