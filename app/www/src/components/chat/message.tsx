import { MessageProps } from "types/chat";
import computedColor from "utils/cssColor";
import emotify from "hooks/emotes";
import style from "./style.module.scss";

const Message = (props: MessageProps) => {
  let color = computedColor(props.user.color, {
    min: 100,
  });

  return (
    <div className={style.message}>
      <span className={style.displayName} style={{ color: color }}>
        {props.user.name}
      </span>
      :{emotify(props.message)}
    </div>
  );
};

export default Message;
