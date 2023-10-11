import React from "react";
import MyMessages from "./MyMessages";
import TheirMessages from "./TheirMessages";
import MessageForm from "./MessageForm";
import { useState, useEffect } from "react";

export default function ChatFeed(props) {
  // console.log(props);
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const { chats, activeChat, userName, messages } = props; //destructuring props
  const chat = chats && chats[activeChat]; //if chats exist then take activechat

  const handleNewMessage = () => {
    setNewMessageReceived(true);
  };

  useEffect(() => {
    // Reset the newMessageReceived state after handling the re-render
    if (newMessageReceived) {
      setNewMessageReceived(false);
    }
  }, [newMessageReceived]);

  const renderReadReceipts = (message, isMyMessage) =>
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  const renderMessages = () => {
    const keys = Object.keys(messages); //taking out all the keys from messages object

    return keys.map((key, index) => {
      //out of all the keys returning only desired message key to display desired message
      const message = messages[key]; //current message
      const lastMessagesKey = index === 0 ? null : keys[index - 1]; //getting one msg before the current msg
      const isMyMessage = userName === message.sender.username; //checking if the current msg is mine or not

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="messages_block">
            {isMyMessage ? (
              <MyMessages message={message} />
            ) : (
              <TheirMessages
                message={message}
                lastMessage={messages[lastMessagesKey]}
              />
            )}
          </div>
          {/* <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '18px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div> */}
        </div>
      );
    });
  };
  // console.log(chat)
  // console.log(userName)
  if (!chat) return <div />;
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
      </div>
      <div className="chat-sub-title">
  {chat.people.map((person, index) => (
    person.person.username !== userName && (
      <div key={`avatar_${index}`} className='message-avatar' style={{ backgroundImage: person.person.avatar && `url(${person.person.avatar})` }}>
        {/* Add any additional avatar content if needed */}
      </div>
    )
  ))}
  {chat.people.map((person, index) => (
    person.person.username !== userName && (
      <div key={`username_${index}`}>
        {person.person.first_name} {person.person.last_name}
      </div>
    )
  ))}
</div>


      {renderMessages()}
      <div style={{ height: "100px" }}></div>
      <div className="message-form-container">
        <MessageForm
          {...props}
          messageSetState={handleNewMessage}
          chatId={activeChat}
        />
      </div>
    </div>
  );
}
