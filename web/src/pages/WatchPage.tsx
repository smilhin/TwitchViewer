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

type VideoProps = {
    name: string,
    url: string
}

const streamers = ["Snailkick", "t2x2live", "cs2_maincast"]
const recordings = [""]

export function WatchPage() {
    return (
    <div className={"flex flex-col gap-3"}>
        <div className="flex flex-row gap-2 w-full max-w-sm">
            <Combobox items={streamers}>
                <ComboboxInput placeholder={"Select a streamer..."} />
                <ComboboxContent>
                    <ComboboxEmpty>No streamers found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <Combobox items={recordings}>
                <ComboboxInput placeholder={"Select a recording..."} />
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
              <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
                  <Video src={""} playsInline />
              </VideoSkin>
          </VideoPlayer>
    </div>);
}