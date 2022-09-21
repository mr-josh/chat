import { MessageProps } from "types/chat";
import computedColor from "utils/cssColor";
import style from "./style.module.scss";

const Message = (props: MessageProps) => {
  let color = computedColor(props.user.color, {
    min: 100,
  });

  console.log(color);

  return (
    <p className={style.message}>
      <span className={style.displayName} style={{ color: color }}>
        {props.user.name}
      </span>
      : <span className={style.content}>{props.message}</span>
    </p>
  );
};

export default Message;
