import style from "./style.module.scss";

const Message = (props: {
  displayName: string;
  color: string;
  message: string;
}) => {
  return (
    <p className={style.message} style={{ backgroundColor: props.color }}>
      <span className={style.displayName}>{props.displayName}</span>:{" "}
      <span className={style.content}>{props.message}</span>
    </p>
  );
};

export default Message;
