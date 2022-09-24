import { MessageProps } from "types/chat";
import computedColor from "utils/cssColor";
import emotify from "./emotes";
import sourceIcon from "./sources";
import style from "./style.module.scss";

const Message = (props: MessageProps) => {
  let color = computedColor(props.user.color, {
    min: 100,
  });

  return (
    <div className={style.message}>
      {sourceIcon(props.source)}
      <span className={style.displayName} style={{ color: color }}>
        {props.user.name}:
      </span>
      {props.message}
    </div>
  );
};

export default Message;
