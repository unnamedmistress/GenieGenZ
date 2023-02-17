const user = {
  id: 1,
  avatarUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
  avatarAltText: "KendoReact Conversational UI RICSU"
};

const bot = { id: 0 };

const initialMessages = [
  {
    author: bot,
    timestamp: new Date(),
    text: "Hello, This is the KendoReact Chat component.",
  },
];
const App = () => {
  const [messages, setMessages] = React.useState(initialMessages);

  const addNewMessage = (event) => {
    setMessages([...messages, event.message]);
  };
}git