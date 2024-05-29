import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function ChatContentArea({ chat }) {
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [showScrollDownArrow, setShowScrollDownArrow] = useState(false);
  const [showInfo, setShowInfo] = useState("");
  const [isInputScrolling, setIsInputScrolling] = useState(false);

  const scrollToBottom = () => {
    // if autoscroll is enabled, scroll to the bottom of the chat content area
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    // console.log("scroll", isInputScrolling);
    // if (isInputScrolling) {
    //   console.log("autoscroll");
    //   setIsAutoScroll(false);
    //   return;
    // }
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;
      //   // if chatContentArea is scrolled up, disable autoscroll
      //   setIsAutoScroll(scrollHeight - scrollTop < clientHeight + 15);
      //   console.log(
      //     "setIsAutoScroll",
      //     scrollHeight - scrollTop < clientHeight + 15
      //   );
      //   // show scroll down arrow if chatContentArea when distances greater than 100
      setShowScrollDownArrow(scrollHeight - scrollTop > clientHeight + 15);
      //   setShowInfo(
      //     scrollHeight +
      //       "," +
      //       scrollTop +
      //       "," +
      //       (scrollHeight - scrollTop) +
      //       "," +
      //       clientHeight
      //   );
      //   console.log(
      //     scrollHeight,
      //     scrollTop,
      //     scrollHeight - scrollTop,
      //     clientHeight
      //   );
    }
  };

  const handleScrollDown = () => {
    setIsAutoScroll(true);
  };

  useEffect(() => {
    if (isAutoScroll) {
      scrollToBottom();
      setIsInputScrolling(true);
    }
  }, [chat, isAutoScroll, isInputScrolling]);

  return (
    <div
      className=" p-3 chat-list"
      ref={chatContainerRef}
      onScroll={handleScroll}
    >
      {chat.map((msg, index) => (
        <Message key={index} role={msg.role} content={msg.content} />
      ))}
      <div className="scrool-button">
        {showScrollDownArrow && (
          <Button
            className="rounded-pill btn-secondary"
            onClick={handleScrollDown}
          >
            <i className="bi bi-arrow-down"></i>
          </Button>
        )}
      </div>
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatContentArea;
