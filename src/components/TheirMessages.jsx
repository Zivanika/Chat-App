import React from 'react'

const TheirMessages = ({message,lastmessage}) => {
  const isFirstMessageByUser = !lastmessage || lastmessage.sender.username !== message.sender.username;

  return (
    <div className='message-row'>
      {isFirstMessageByUser && (
        <div className='ce-avatar' style={{marginTop:"8px", marginLeft: "4px", width: "34px", height: "34px", borderRadius: "22px", color: "white", textAlign: "center", backgroundColor: "#649024", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover", overflow: "hidden" }}>
  <div className='message-avatar' style={{ width: "100%", height: "100%", backgroundImage: message.sender && `url(${message.sender.avatar})` }} />
  <div className='ce-avatar-text' style={{ color: "white", paddingTop: "14px", fontSize: "15px", fontWeight: "600" }}>
    ZE
  </div>
</div>

      )}
      { message.attachments && message.attachments.length > 0? ( 
      <img
        src={message.attachments[0].file}
        alt="Attached Image"
        className="message-image"
        style={{ marginLeft:isFirstMessageByUser?"4px":"48px" }}
      />
      ) : (
        <div className="message" style={{float:"left",marginLeft: isFirstMessageByUser?"4px":"48px",color:"#60656e", borderRadius: "18px 18px 18px 1px",backgroundColor:"rgb(239, 242, 242)"}}>
        {message.text}
        </div>
          )
    }
    </div>
  );
};

export default TheirMessages;
