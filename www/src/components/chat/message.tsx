import { MessageProps } from "types/chat";
import computedColor from "utils/cssColor";
import { motion } from "framer-motion";
// import sourceIcon from "./sources";
import style from "./style.module.scss";
import { useEffect, useState } from "react";

const Message = (props: MessageProps) => {
  const [self, setSelf] = useState<HTMLDivElement | null>();
  let color = computedColor(props.user.color, {
    min: 100,
  });

  const updateOpacity = () => {};

  useEffect(() => {
    if (!self) return;
    const height = document.body.clientHeight;
    self.style.opacity = `${Math.min(
      1,
      Math.max(0, self.offsetTop) / (height / 4)
    )}`;
  }, [props]);

  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, rotate: 180, transition: { duration: 0.25 } }}
      className={style.message}
      ref={(s) => setSelf(s)}
    >
      {/* {sourceIcon(props.source)} */}
      <span className={style.displayName} style={{ color: color }}>
        {props.user.name}:
      </span>
      {props.message}
    </motion.div>
  );
};

export default Message;
