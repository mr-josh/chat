const getUrl = (id: string) => {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`;
};

const emotify = (message: string, emotes?: { [id: string]: string[] }) => {
  if (!emotes) return <p className="content">{message}</p>;

  const replacements = [];

  for (const [emoteId, positions] of Object.entries(emotes)) {
    const [start, end] = positions[0].split("-");
    const emoteKey = message.substring(+start, +end + 1);

    replacements.push({
      key: emoteKey,
      value: getUrl(emoteId),
    });
  }

  const html = replacements.reduce(
    (acc, { key, value }) => acc.split(key).join(`<img src="${value}" />`),
    message
  );

  return <p className="content" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default emotify;
