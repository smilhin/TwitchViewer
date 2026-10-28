import {insertStreamer, removeStreamer} from "../db/users";

export function addStreamer(userId: string, channelName: string): { channelName: string } | null {
    const channel = channelName.trim().toLowerCase();
    return insertStreamer(userId, channel) ? {channelName: channel} : null;
}

export function deleteStreamer(userId: string, channelName: string): { channelName: string } | null {
    const channel = channelName.trim().toLowerCase();
    return removeStreamer(userId, channel) ? {channelName: channel} : null;
}