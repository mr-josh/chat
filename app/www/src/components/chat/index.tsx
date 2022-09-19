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
  >([
    {
      user: {
        name: "Welcome Bot",
        color: "#92f4f4",
        subscriber: false,
        moderator: false,
      },
      message: "Welcome to the chat!",
    },
  ]);

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
            color: tags.color || "#e5a040",
            subscriber: tags.subscriber || false,
            moderator: tags.mod || false,
          },
          message,
        },
      ]);
      setTimeout(() => {
        const chat = document.getElementById("chat")!;
        chat.scrollTo(0, chat.scrollHeight);
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
    <div id="chat" className={style.chat}>
      {chat.map((chat, i) => (
        <Message
          key={i}
          displayName={chat.user.name}
          color={chat.user.color}
          message={chat.message}
        ></Message>
      ))}
      {/* <button
        onClick={() =>
          setChat((chat) => [
            ...chat.slice(-Math.abs(props.maxHistory || 1000)),
            {
              user: {
                name: "Test",
                color: "#e5a040",
                subscriber: false,
                moderator: false,
              },
              message: "Testing",
            },
          ])
        }
      >
        Test
      </button> */}
    </div>
  );
};

export default Chat;
