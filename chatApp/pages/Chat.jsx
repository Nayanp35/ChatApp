/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBody from "../components/ChatBody.jsx";
import ChatFooter from "../components/ChatFooter";
import ChatDrawer from "../components/ChatDrawer.jsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { findUserById } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setConversationId } from "../redux/conversationIdSlice";
import { setReceiverId } from "../redux/receiverIdSlice";
import axios from "axios";
import { fetchMessages, addMessage } from "../redux/chatMessagesSlice.js";

const socket = io.connect("http://localhost:3000/");
export default function Chat() {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const [user, setUser] = useState({});
  const chatMessages = useSelector((state) => state.chatMessages);
  const currentUser = useSelector((state) => state.currentUser);
  const conversationId = useSelector((state) => state.conversationId);
  const users = useSelector((state) => state.users);
  const chatContainerRef = useRef(null);
  const receiverId = useSelector((state) => state.receiverId);

  // const sortedChat = chatMessages.sort((a, b) => a.created_at - b.created_at);

  //Get the conversationId based on the receiverId

  useEffect(() => {
    axios.post("/api/conversation", { receiverId }).then((res) => {
      dispatch(setConversationId(res.data[0].uuid));
    });
  }, [conversationId, receiverId]);

  // Get all the previous messages
  useEffect(() => {
    axios.get(`/api/messages/${conversationId}`).then((res) => {
      dispatch(fetchMessages(res.data));
    });
  }, [conversationId, receiverId]);

  useEffect(() => {
    const userData = findUserById(users, uuid);
    if (userData) setUser(userData);
  }, [receiverId, users]);

  useEffect(() => {
    if (chatMessages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // update receiverId
  useEffect(() => {
    dispatch(setReceiverId(uuid));
    socket.emit("join_room", conversationId);
  }, [uuid, receiverId, conversationId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [conversationId, receiverId, uuid]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const messageData = {
      receiverId,
      conversationId,
      sender_id: currentUser.uuid,
      content: message,
      room: conversationId,
      created_at: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    axios
      .post("/api/message", messageData)
      .then((res) => {
        dispatch(addMessage(res.data[0]));
      })
      .catch((err) => console.log(err));

    socket.emit("send_message", messageData);
    e.target.reset();
  };

  return (
    <div className="h-screen flex flex-col md:flex-row mb-5">
      <ChatDrawer />
      <div className="w-full mr-20 ">
        <div className="md:w-full">
          <div className="flex flex-col m-5 h-full">
            <div className="container mx-auto max-w-screen-lg shadow-lg rounded-lg h-full bg-green-200">
              <div className="px-5 py-5 flex justify-between items-center bg-green-200 border-b-2">
                <div className="font-semibold text-2xl">
                  Chatting with @{user.username}
                </div>
              </div>
              <div className="flex flex-row justify-between bg-white flex-grow h-full">
                <div className="w-full px-5 flex flex-col justify-between h-full">
                  <div
                    ref={chatContainerRef}
                    className="chat-messages"
                    style={{
                      maxHeight: "65vh",
                      minHeight: "65vh",
                      overflowY: "auto",
                    }}
                  >
                    <ScrollToBottom>
                      {chatMessages.map((m) => {
                        return (
                          <ChatBody
                            key={crypto.randomUUID()}
                            position={
                              currentUser.uuid === m.sender_id ? "end" : "start"
                            }
                            content={m.content}
                          />
                        );
                      })}
                    </ScrollToBottom>
                  </div>
                  <div className="py-5">
                    <ChatFooter onSubmit={sendMessage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
