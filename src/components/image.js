import styled from "styled-components";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { Row } from "react-bootstrap";
import { voteImg } from "../util/api";
import ColorImg from "./color";

const StyledCard = styled.div`
  border: 2px solid #212529;
  border-radius: 12px;
  margin: 20px;
  transition: box-shadow 0.2s;
  background-color: white;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.3);
  }
`;

const StyledImg = styled.img`
  border-radius: 12px;
  margin: 20px 20px 0 20px;
`;

const StyledVoteBtn = styled.span`
  transition: color 0.2s;
  &:hover {
    cursor: pointer;
  }

  &.up:hover,
  &.upped {
    color: #00d941;
  }

  &.down:hover,
  &.downed {
    color: #ff3936;
  }
`;

const Image = ({ src, color, data, rerender, setRerender, setShow, netId }) => {
  const btn_size = 30;

  return (
    <StyledCard
      onClick={() => {
        setShow({ src, color, data });
      }}
    >
      {src && !color ? (
        <StyledImg src={src} height={200} />
      ) : (
        <div style={{ margin: "20px 20px 0 20px" }}>
          <ColorImg color={color} caption={data.caption} />
        </div>
      )}
      <Row className="mx-auto my-4 justify-content-center">
        <StyledVoteBtn
          className={`my-auto mx-4 up ${
            netId && data.upvotes.includes(netId) ? "upped" : ""
          }`}
        >
          <FiThumbsUp
            size={btn_size}
            style={{ display: "inline-block", zIndex: 69 }}
            onClick={async (e) => {
              e.stopPropagation();
              await voteImg(data._id, "up");
              setRerender(rerender + 1);
            }}
          />
        </StyledVoteBtn>
        <StyledVoteBtn
          className={`my-auto mx-4 down ${
            netId && data.downvotes.includes(netId) ? "downed" : ""
          }`}
        >
          <FiThumbsDown
            size={btn_size}
            style={{ display: "inline-block", zIndex: 69 }}
            onClick={async (e) => {
              e.stopPropagation();
              await voteImg(data._id, "down");
              setRerender(rerender + 1);
            }}
          />
        </StyledVoteBtn>
      </Row>
    </StyledCard>
  );
};

export default Image;
