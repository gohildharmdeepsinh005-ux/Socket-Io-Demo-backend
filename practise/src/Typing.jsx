import { useEffect, useState } from "react";
import "./Typing.css";
import { io } from "socket.io-client";
// import axios from "axios";

const socket = io("https://socket-io-demo-backend-final.onrender.com" , {
      transports: ["websocket"]
});

export default function Typing() {

       const [userMsg , setUserMsg] = useState("");

       const [resMsg , setResMsg] = useState("");
       const [showResMsg , setShowResMsg] = useState(false);

       const [messages , setMessages] = useState([]);

       useEffect(() => {
               socket.emit("joinRoom" , "sample_id_123");

               return () => {
                    socket.off("joinRoom");
               }
       } , []);

       useEffect(() => {
             
              socket.on("forwardMsg" , (msg) => {
                        setResMsg(msg);
                        setShowResMsg(true);
              });

              return () => {
                  socket.off("forwardMsg");
              }
       } , []);

       useEffect(() => {
              
             socket.emit("sendChats" , "sample_id_123");

             return () => {
                   socket.off("sendChats");
             }
       } , [userMsg]);

       useEffect(() => {
              
             socket.on("messages" , (msgs) => {
                    setMessages(msgs);
             });

             return () => {
                   socket.off("messages");
             }
       } , []);

       const handleIpChange = (event) => {
            setUserMsg(event.target.value);      
       }

       const handleBtnChange = () => {

             if(!userMsg) {
                   return;
             }
              
             socket.emit("message" , {roomId: "sample_id_123" , msg: userMsg});

             setUserMsg("");
       }

       return (
            <>
                 <h1> Whatsapp Demo </h1>

                 <input placeholder="Enter Message...." onChange={handleIpChange} className="input" value={userMsg}/> <button className="btn"  onClick={handleBtnChange}> Send </button>

                 <br/>

                 <div className="chatCont">
                         
                                {
                                      messages.map((msg) => {
                                            return <>
                                              <div className="resMsg">{msg.msg}</div>
                                            </>
                                      })
                                }
                 </div>
            </>
       )
}