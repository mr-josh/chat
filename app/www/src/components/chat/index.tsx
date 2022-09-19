import { useEffect, useState } from "react";

import { Client } from "tmi.js";
import Message from "./message";
import style from "./style.module.scss";

const Chat = (props: { maxHistory?: number }) => {
  const [chat, setChat] = useState<
    {
      user: {
        name: string;
        color: string;
        subscriber: boolean;
        moderator: boolean;
      };
      message: string;
    }[]
  >([]);

  useEffect(() => {
    const client = new Client({
      channels: ["dotmrjosh"],
    });

    client.addListener("message", (channel, tags, message, self) => {
      setChat((chat) => [
        ...chat.slice(-Math.abs(props.maxHistory || 1000)),
        {
          user: {
            name: tags["display-name"] || tags.username || "unknown",
            color: "#f4bedb",
            subscriber: tags.subscriber || false,
            moderator: tags.mod || false,
          },
          message,
        },
      ]);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
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

  return (
    <div className={style.chat}>
      {chat.map((chat, i) => (
        <Message
          key={i}
          displayName={chat.user.name}
          color={chat.user.color}
          message={chat.message}
        ></Message>
      ))}
    </div>
  );
};

export default Chat;
