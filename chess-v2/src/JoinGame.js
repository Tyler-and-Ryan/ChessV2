import { React, Fragment, useState, useEffect } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import ChessBoard from "./ChessBoard.js";
import "./JoinGame.css";

const JoinGame = (props) => {
  const [opponentUsername, setOpponentUsername] = useState("");
  const [channel, setChannel] = useState(null); //channel object
  const { client } = useChatContext();
  useEffect(() => {
      const deleteChannel = async () => {
        const response = await client.queryUsers({
          name: { $eq: opponentUsername },
        });
    
        if (response.users.length === 0) {
          return;
        }
    
        const currChannel = await client.queryChannels({
          members: { $in: [client.userID] }
        });
        if (currChannel && currChannel[0]) { //if opponent hasn't already deleted the channel, then do so
          currChannel[0].removeMembers([client.userID]); //removes user from channel
          currChannel[0].stopWatching();
          //if members length === 0, then delete the channel
          const currentChannelMembers = await currChannel[0].queryMembers({}, {}, {}) //no filters, no options, no sorting. Trying to see all members in channel
          console.log("currentChannelMembers.members: " + JSON.stringify(currentChannelMembers.members));
          if (currentChannelMembers.members.length === 0) {
            currChannel[0].delete();
          }
        }
        setChannel(null);
      };
    
      if (!props.gameActive) {
        deleteChannel();
      }
  }, [props.gameActive]);

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

    //setting user permission to admin allows each client to delete the channel when the game is finished
    // const assignRolesResponse = await newChannel.assignRoles([{user_id: client.userID, channel_role:"admin"}]);
    await client.partialUpdateUser({id: client.userID, set: {channel_role: "admin"}, unset: []});
    await client.partialUpdateUser({id: response.users[0].id, set: {channel_role: "admin"}, unset: []});
    console.log(client.userID + " assigned role of \"admin\" ");

    await newChannel.watch();
    setChannel(newChannel);
    props.setGameActive(true);
  };
  

  return (
    <Fragment>
      {channel ? (
        <Channel channel={channel}>
            <ChessBoard channel={channel} showPopUp={props.showPopUp} closePopUp={props.closePopUp} />
        </Channel>
      ) : (
        <div className="joinGameHeader">
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
