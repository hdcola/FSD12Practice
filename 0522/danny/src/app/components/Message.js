function Message({ role, content }) {
  return (
    <div
      className={
        role === "assistant"
          ? "d-flex flex-row ai-chat-box"
          : "d-flex flex-row user-chat-box"
      }
    >
      <div className="chat-icon">
        {role === "assistant" ? (
          <i className="bi bi-robot"></i>
        ) : (
          <i className="bi bi-person-circle"></i>
        )}
      </div>
      <div className="chat-text">{content}</div>
    </div>
  );
}

export default Message;
