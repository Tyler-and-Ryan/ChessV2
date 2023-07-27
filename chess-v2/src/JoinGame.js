import { React, Fragment, useState, useEffect } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import { BUTTON_TYPES } from "./data/stringEnums.js";
import infoBtn from "./visualAssets/infoBtn.png";
import ChessBoard from "./ChessBoard.js";
import Button from "./uiComponents/Button.js";
import "./JoinGame.css";

const JoinGame = (props) => {
  const [opponentUsername, setOpponentUsername] = useState("");
  const [channel, setChannel] = useState(null); //channel object
  const [isIconHovered, setIsIconHovered] = useState(false);
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
        members: { $in: [client.userID] },
      });
      if (currChannel && currChannel[0]) {
        //if opponent hasn't already deleted the channel, then do so
        currChannel[0].removeMembers([client.userID]); //removes user from channel
        currChannel[0].stopWatching();
        //if members length === 0, then delete the channel
        const currentChannelMembers = await currChannel[0].queryMembers(
          {},
          {},
          {}
        ); //no filters, no options, no sorting. Trying to see all members in channel
        console.log(
          "currentChannelMembers.members: " +
            JSON.stringify(currentChannelMembers.members)
        );
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
    await client.partialUpdateUser({
      id: client.userID,
      set: { channel_role: "admin" },
      unset: [],
    });
    await client.partialUpdateUser({
      id: response.users[0].id,
      set: { channel_role: "admin" },
      unset: [],
    });
    console.log(client.userID + ' assigned role of "admin" ');

    await newChannel.watch();
    setChannel(newChannel);
    props.setGameActive(true);
  };

  const onHoverIcon = () => {
    setIsIconHovered(true);
  };

  const onLeaveIcon = () => {
    setIsIconHovered(false);
  };

  return (
    <Fragment>
      {channel ? (
        <Channel channel={channel}>
          <ChessBoard
            channel={channel}
            showPopUp={props.showPopUp}
            closePopUp={props.closePopUp}
          />
        </Channel>
      ) : (
        <>
          <div className="joinGameHeader">
            <label>
              <div className="joinGameLabel">
                <h4>Play Against Friend</h4>
                <img
                  className="infoBtn"
                  src={infoBtn}
                  alt="infoBtn"
                  onMouseEnter={onHoverIcon}
                  onMouseLeave={onLeaveIcon}
                />
              </div>
              <div>
                <input
                  className="opponentInputBox"
                  placeholder="Username of opponent..."
                  onChange={(event) => {
                    setOpponentUsername(event.target.value);
                  }}
                />
              </div>
              {isIconHovered && (
                <div className="infoText">
                  Enter the name of another user who is currently online and
                  press the button to join a game. <hr />
                  Once the other user does the same with your name, then the
                  game will start.
                </div>
              )}
            </label>
            <Button
              onClick={createChannel}
              text="Join/Start Game"
              type={BUTTON_TYPES.SECONDARY}
            />
          </div>
          <div className="joinComputerHeader">
            <h4>Play Against Computer</h4>
            <Button
              onClick={() => {}}
              text="In Development"
              type={BUTTON_TYPES.SECONDARY}
            />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default JoinGame;
