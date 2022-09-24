import { useEffect, useState } from "react";

import Message from "./message";
import { MessageProps } from "types/chat";
import emotify from "./emotes";
import style from "./style.module.scss";
import useTwitchChat from "hooks/twitch";
import useYouTubeChat from "hooks/youtube";

const Chat = (props: { maxHistory?: number }) => {
  const [chat, setChat] = useState<MessageProps[]>([
    {
      source: "system",
      user: {
        name: "Mr Chat",
        color: "#92f4f4",
        subscriber: false,
        moderator: false,
      },
      message: emotify("Welcome to the chat!"),
    },
  ]);

  useYouTubeChat((message) => {
    setChat((c) => [...c.slice(-Math.abs(props.maxHistory || 1000)), message]);
  });

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
      {/* <button
        style={{
          position: "absolute",
          bottom: 0,
        }}
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
              message: "PepeHands",
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
