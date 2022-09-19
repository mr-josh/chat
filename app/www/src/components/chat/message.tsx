import computedColor from "utils/cssColor";
import style from "./style.module.scss";

const Message = (props: {
  displayName: string;
  color: string;
  message: string;
}) => {
  let color = computedColor(props.color, {
    min: 100,
  });

  console.log(color);

  return (
    <p className={style.message}>
      <span className={style.displayName} style={{ color: color }}>
        {props.displayName}
      </span>
      : <span className={style.content}>{props.message}</span>
    </p>
  );
};

export default Message;
