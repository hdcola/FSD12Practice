import "./App.css";

function App() {
  return (
    <div className="container-fluid text-center ">
      <div className="row sticky-top">
        <div className="col m-2" id="header">
          <h1>Chat Box</h1>
        </div>
      </div>

      <div className="row content-row">
        <div className="chat-box chat-messages">
          <div className="message user">
            <div className="text">Hello!</div>
          </div>
          <div className="message bot">
            <div className="text">Hi! How can I help you?</div>
          </div>
          <div className="message user">
            <div className="text">I need some information.</div>
          </div>
          <div className="message bot">
            <div className="text">Sure, what do you need to know?</div>
          </div>
          
          

        </div>
      </div>

      <div className="row sticky-bottom">
        <div className="col m-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message here..."
            />
            <button className="btn btn-primary" type="button">
              Send
            </button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
