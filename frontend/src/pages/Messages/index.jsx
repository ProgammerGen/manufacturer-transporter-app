import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthReducer"
import axios from "axios"

import { MessageSection, MessageContainer } from "../../styles/Message"

const Messages = () => {
  const { user } = useContext(AuthContext)
  const { details } = user

  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/message/listReplies/${details._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_key}`,
            },
          }
        )
        const newMessages = data.messages
        setMessages(newMessages)
      } catch (error) {
        console.error("Error fetching transporters:", error)
      }
    }

    fetchMessages()
  }, [])

  return (
    <>
      <MessageSection>
        <MessageContainer className="container">
          <div className="row g-3 align-items-center">
            <div className="col table-responsive p-3">
              <table class="table table-striped rounded-3 overflow-hidden ">
                <thead>
                  <tr>
                    <th className="h4 fw-bold" scope="col">
                      Transporter Name
                    </th>
                    <th className="h4 fw-bold" scope="col">
                      Qouted Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages &&
                    messages.map((message, index) => {
                      return (
                        <>
                          <tr>
                            <th>{message.transporter_name}</th>
                            <th>{message.price}</th>
                          </tr>
                        </>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </MessageContainer>
      </MessageSection>
    </>
  )
}

export default Messages
