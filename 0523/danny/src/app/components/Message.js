import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, content }) {
  // let autoscroll = true;

  // function debounce(func, wait) {
  //   let timeout;
  //   return function (...args) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(this, args), wait);
  //   };
  // }

  // const chatContentArea = document.querySelector("#chat-content");
  // // observe the chat content area for changes in height
  // const resizeObserver = new ResizeObserver((entries) => {
  //   for (let entry of entries) {
  //     // if autoscroll is enabled, scroll to the bottom of the chat content area
  //     if (autoscroll) {
  //       chatContentArea.scrollTop = chatContentArea.scrollHeight;
  //     }
  //   }
  // });
  // resizeObserver.observe(chatContentArea);
  // // if chatContentArea is scrolled up, disable autoscroll
  // // if chatContentArea is scrolled down to bottom, enable autoscroll
  // chatContentArea.addEventListener(
  //   "scroll",
  //   debounce(() => {
  //     if (
  //       chatContentArea.scrollTop + chatContentArea.clientHeight <
  //       chatContentArea.scrollHeight
  //     ) {
  //       autoscroll = false;
  //     } else {
  //       autoscroll = true;
  //     }
  //     console.log(
  //       chatContentArea.scrollTop + chatContentArea.clientHeight,
  //       chatContentArea.scrollHeight,
  //       autoscroll
  //     );
  //   }, 100)
  // );

  return (
    <div
      className={
        role === "assistant"
          ? "d-flex flex-row ai-chat-box border p-2 m-1 rounded"
          : "d-flex flex-row user-chat-box border p-2 m-1 rounded"
      }
    >
      <div className="chat-icon px-1">
        {role === "assistant" ? (
          <i className="bi bi-robot"></i>
        ) : (
          <i className="bi bi-person-circle"></i>
        )}
      </div>
      <Markdown remarkPlugins={[remarkGfm]} className="chat-text mx-1">
        {content}
      </Markdown>
    </div>
  );
}

export default Message;
