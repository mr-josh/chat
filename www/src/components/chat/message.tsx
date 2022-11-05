import { MessageProps } from "types/chat";
import computedColor from "utils/cssColor";
import { motion } from "framer-motion";
// import sourceIcon from "./sources";
import style from "./style.module.scss";

const Message = (props: MessageProps) => {
  let color = computedColor(props.user.color, {
    min: 100,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className={style.message}
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
