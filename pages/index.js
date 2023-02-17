import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
const MessageTemplate = props => {
  return <div className="k-bubble">
      <div>The message text is {props.item.text}</div>
    </div>;
};
const user = {
  id: 1,
  name: "Jane",
  avatarUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
  avatarAltText: "KendoReact Conversational UI RICSU"
};
const App = () => {
  const [messages, setMessages] = React.useState([]);
  const addNewMessage = event => {
    setMessages([...messages, event.message]);
  };
  return <div>
      <Chat user={user} messages={messages} onMessageSend={addNewMessage} width={400} messageTemplate={MessageTemplate} />
    </div>;
};
ReactDOM.render(<App />, document.querySelector('my-app'));