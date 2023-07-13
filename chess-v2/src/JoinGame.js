import { React, Fragment, useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import ChessBoard from "./ChessBoard.js";

const JoinGame = (props) => {
  const [opponentUsername, setOpponentUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  const createChannel = async () => {
    //$eq means equal to (opponentUsername)
    const response = await client.queryUsers({
      name: { $eq: opponentUsername },
    });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <Fragment>
      {channel ? (
        <Channel channel={channel}>
            <ChessBoard channel={channel} showPopUp={props.showPopUp} closePopUp={props.closePopUp} />
        </Channel>
      ) : (
        <div>
          <h4>Create Game</h4>
          <input
            placeholder="Username of opponent..."
            onChange={(event) => {
              setOpponentUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </Fragment>
  );
};

export default JoinGame;
