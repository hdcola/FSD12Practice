import Message from "./Message";
import { useEffect, useRef, useState } from "react";

function ChatContentArea({ chat }) {
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [showScrollDownArrow, setShowScrollDownArrow] = useState(false);

  const scrollToBottom = () => {
    // if autoscroll is enabled, scroll to the bottom of the chat content area
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;
      // if chatContentArea is scrolled up, disable autoscroll
      setIsAutoScroll(scrollHeight - scrollTop === clientHeight);
      // show scroll down arrow if chatContentArea when distances greater than 100
      setShowScrollDownArrow(scrollHeight - scrollTop > clientHeight + 100);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      scrollToBottom();
    }
  }, [chat, isAutoScroll]);

  return (
    <div
      className="chat-content-area px-2"
      ref={chatContainerRef}
      onScroll={handleScroll}
    >
      {chat.map((msg, index) => (
        <Message key={index} role={msg.role} content={msg.content} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatContentArea;
