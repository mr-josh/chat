const CHAT_SOURCE = {
  youtube: "/icons/youtube.png",
  twitch: "/icons/twitch.png",
};

const sourceIcon = (source: string) => {
  if (Object.keys(CHAT_SOURCE).includes(source)) {
    return (
      <img
        // @ts-ignore
        src={CHAT_SOURCE[source]}
        alt={source}
      />
    );
  }

  return null;
};

export default sourceIcon;
