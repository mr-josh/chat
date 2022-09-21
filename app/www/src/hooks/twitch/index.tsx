import { Client } from "tmi.js";
import { MessageProps } from "types/chat";
import { useEffect } from "react";

const useTwitchChat = (onMessage: (message: MessageProps) => void) => {
  useEffect(() => {
    const client = new Client({
      channels: ["dotmrjosh"],
    });

    client.addListener("message", (channel, tags, message, self) => {
      onMessage({
        source: "twitch",
        user: {
          name: tags["display-name"] || tags.username || "unknown",
          color: tags.color || "#e5a040",
          subscriber: tags.subscriber || false,
          moderator: tags.mod || false,
        },
        message,
      });
    });

    const connect = async () => {
      console.log("Connected");
      await client.connect();
    };

    let attempt = connect();

    return () => {
      const disconnect = async () => {
        await attempt;

        console.log("Disconnected");
        client.removeAllListeners();
        await client.disconnect();
      };

      disconnect();
    };
  }, []);
};

export default useTwitchChat;
