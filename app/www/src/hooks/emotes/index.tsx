const EMOTES = {
  // Twitch emotes
  Kappa: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0",
  BibleThump: "https://static-cdn.jtvnw.net/emoticons/v1/86/3.0",
  Kreygasm: "https://static-cdn.jtvnw.net/emoticons/v1/41/3.0",
  ResidentSleeper: "https://static-cdn.jtvnw.net/emoticons/v1/245/3.0",
  "4Head": "https://static-cdn.jtvnw.net/emoticons/v1/354/3.0",
  DansGame: "https://static-cdn.jtvnw.net/emoticons/v1/33/3.0",
  NotLikeThis: "https://static-cdn.jtvnw.net/emoticons/v1/58765/3.0",
  TriHard: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaS: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaW: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaHmm: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaE: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaOMEGA: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaGIGA: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  monkaTOS: "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0",
  SeemsGood: "https://static-cdn.jtvnw.net/emoticons/v2/64138/default/dark/3.0",

  // Pravis emotes
  parisv1Laugh:
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_90e92c157fc445fdb53ffdfc91f0d587/default/dark/3.0",

  // BTTV emotes
  PepeHands: "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/3x",
};

const emotify = (message: string) => {
  const words = message.split(" ");

  const isOnlyEmotes = words.every((word) =>
    Object.keys(EMOTES).includes(word)
  );

  return (
    <div className={`content ${isOnlyEmotes && "emotes-only"}`}>
      {isOnlyEmotes && <br />}
      {words.map((word, i) => {
        if (Object.keys(EMOTES).includes(word)) {
          return (
            <img
              key={i}
              // @ts-ignore
              src={EMOTES[word]}
              alt={word}
            />
          );
        }
        return <span key={i}>{word}</span>;
      })}
    </div>
  );
};

export default emotify;
