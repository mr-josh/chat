import { useEffect, useState } from "react";

import Message from "./message";
import { MessageProps } from "types/chat";
import style from "./style.module.scss";
import useTwitchChat from "hooks/twitch";

const Chat = (props: { maxHistory?: number }) => {
  const [chat, setChat] = useState<MessageProps[]>([
    {
      source: "system",
      user: {
        name: "Welcome Bot",
        color: "#92f4f4",
        subscriber: false,
        moderator: false,
      },
      message: "Welcome to the chat!",
    },
  ]);

  useTwitchChat((message) => {
    setChat((c) => [...c.slice(-Math.abs(props.maxHistory || 1000)), message]);
  });

  useEffect(() => {
    const chat = document.getElementById("chat")!;
    chat.scrollTo(0, chat.scrollHeight);
  }, [chat]);

  return (
    <div id="chat" className={style.chat}>
      {chat.map((chat, i) => (
        <Message key={i} {...chat} />
      ))}
      <button
        onClick={() =>
          setChat((chat) => [
            ...chat.slice(-Math.abs(props.maxHistory || 1000)),
            {
              source: "system",
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
      </button>
    </div>
  );
};

export default Chat;
