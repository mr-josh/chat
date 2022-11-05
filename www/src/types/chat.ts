export interface MessageProps {
  id: string;
  source: string;
  user: {
    name: string;
    color: string;
    subscriber: boolean;
    moderator: boolean;
  };
  message: JSX.Element;
}
