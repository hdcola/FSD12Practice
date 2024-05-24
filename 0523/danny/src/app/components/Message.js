import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, content }) {
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
