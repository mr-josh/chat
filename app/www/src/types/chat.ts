export interface MessageProps {
  source: string;
  user: {
    name: string;
    color: string;
    subscriber: boolean;
    moderator: boolean;
  };
  message: string;
}
