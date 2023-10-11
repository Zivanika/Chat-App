import React from "react";
import { useState } from "react";
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { sendMessage, isTyping } from "react-chat-engine";


export default function MessageForm(props) {
  const [shouldRerender, setShouldRerender] = useState(false); 
  const [value, setValue] = useState("");
  const { chatId, creds} = props;
  // let chatID=props.chatId;
  // alert(creds)

  const handleChange = (event) => {
    setValue(event.target.value);
    // isTyping(props, chatId);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); //default HTML behavior is to reload the page on submitting

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }
    setValue("");
    props.messageSetState();

    document.querySelector(".ce-active-chat-card").click();
  };

  const handleUpload = (event) =>{
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <InsertPhotoOutlinedIcon  style={{ color: 'rgb(109, 109, 109)' }} className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendRoundedIcon fontSize="medium" className="send-icon" />
      </button>
    </form>
  );
}
