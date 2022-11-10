import { useEffect, useState } from "react";

import Message from "./message";
import { MessageProps } from "types/chat";
import style from "./style.module.scss";
import useTwitchChat from "hooks/twitch";
import emotify from "./emotes";
import { AnimatePresence } from "framer-motion";

const FADE_AWAY = 8;

const Chat = (props: { maxHistory?: number }) => {
  const [chat, setChat] = useState<MessageProps[]>([]);

  useTwitchChat(
    (message) => {
      // Add message to chat
      setChat((c) => [
        ...c.slice(-Math.abs(props.maxHistory || 1000)),
        message,
      ]);

      // Remove message after FADE_AWAY seconds
      setTimeout(() => {
        setChat((c) => c.filter((m) => m.id !== message.id));
      }, 1000 * FADE_AWAY);
    },
    (id) => {
      setChat((c) => c.filter((m) => m.id !== id));
    }
  );

  useEffect(() => {
    const chat = document.getElementById("chat")!;
    chat.scrollTo(0, chat.scrollHeight);
  }, [chat]);

  return (
    <div id="chat" className={style.chat}>
      <AnimatePresence>
        {chat.map((chat, i) => (
          <Message key={chat.id} {...chat} />
        ))}
      </AnimatePresence>
      {/* <button
        style={{
          position: "absolute",
          top: 0,
        }}
        onClick={() => {
          let testId = Math.random().toString(36).substring(7);

          setChat((chat) => [
            ...chat.slice(-Math.abs(props.maxHistory || 1000)),
            {
              id: testId,
              source: "system",
              user: {
                name: "MrChat",
                color: "#92f4f4",
                subscriber: false,
                moderator: false,
              },
              message: emotify("Hi chat! " + Math.floor(Math.random() * 100)),
            },
          ]);

          setTimeout(() => {
            setChat((c) => c.filter((m) => m.id !== testId));
          }, 1000 * FADE_AWAY);
        }}
      >
        Test
      </button> */}
    </div>
  );
};

export default Chat;
