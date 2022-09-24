import { useEffect, useState } from "react";

import { MessageProps } from "types/chat";
import emotify from "components/chat/emotes";

const useYouTubeChat = (onMessage: (message: MessageProps) => void) => {
  const [pageToken, setPageToken] = useState<string | undefined>();
  const endpoint =
    "https://youtube.googleapis.com/youtube/v3/liveChat/messages";
  const liveChatId = "KicKGFVDY3ZMbDZLbGxuX04wOHIyOGF4akJuQRILRHRpZy1WZmhMVGs";
  const maxResults = 100;

  useEffect(() => {
    const startTime = new Date().getTime();
    const shownMessages: Set<string> = new Set();
    let controller = new AbortController();
    let { signal } = controller;
    let timeout: NodeJS.Timeout;

    const requestHandler = async () => {
      // Build the request url
      let url = `${endpoint}?liveChatId=${liveChatId}&part=snippet%2CauthorDetails&maxResults=${maxResults}`;
      url += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      // Fetch the messages
      const response = await fetch(url, {
        signal,
      });

      if (response.ok) {
        const data = await response.json();
        const { nextPageToken, pollingIntervalMillis, items } = data;

        // For each message
        for (const message of items) {
          // If the message is before the start time, skip it
          if (new Date(message.snippet.publishedAt).getTime() < startTime)
            continue;

          // If the message has already been shown, skip it
          if (shownMessages.has(message.id)) continue;
          shownMessages.add(message.id);

          // Show the message
          onMessage({
            source: "youtube",
            user: {
              color: "#ff9999",
              moderator:
                message.authorDetails.isChatModerator ||
                message.authorDetails.isChatOwner ||
                false,
              name: message.authorDetails.displayName,
              subscriber: message.authorDetails.isChatSponsor,
            },
            message: emotify(message.snippet.displayMessage),
          });
        }

        setPageToken(nextPageToken);

        timeout = setTimeout(requestHandler, pollingIntervalMillis + 100);
      } else {
        timeout = setTimeout(requestHandler, 10000); // try again in 10 seconds
      }
    };

    setTimeout(requestHandler, 5000);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);
};

export default useYouTubeChat;
