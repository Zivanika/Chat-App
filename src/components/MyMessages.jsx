import React from "react";

export default function MyMessages({ message }) {
  return (
    <div className='message-column'>

  
  { message.attachments && message.attachments.length > 0? ( 
    <img
    src={message.attachments[0].file}
    alt="Attached Image"
      className="message-image"
      style={{float: 'right' ,marginRight: '18px' }}
      />
      ) : (
      <div className="message" style={{float:"right",color:"white", borderRadius: "18px 18px 1px 18px",  background: "linear-gradient(90deg,rgba(104, 132, 252, 1) 0%,rgba(88, 168, 244, 1) 35%,rgba(72, 212, 228, 1) 100%"}}>
      {message.text}
      </div>
        )
      }
      </div>
   );
};
