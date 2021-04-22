import { useState, useEffect, useCallback } from "react";
import { getImages } from "../util/api";
import Image from "../components/image";
import ImageModal from "../components/imagemodal";
import { Row, Spinner } from "react-bootstrap";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

const Images = ({ status }) => {
  const [images, setImages] = useState([]);
  const [netId, setNetId] = useState();
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [show, setShow] = useState({});

  const fetchImages = useCallback(async () => {
    let data = await getImages(status);
    if (data && data.data && data.data.images) {
      setImages(data.data.images.reverse());
      setNetId(data.data.netId);
    }
    setLoading(false);
  }, [status]);

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [status, rerender, fetchImages]);

  return (
    <div className="d-flex flex-column">
      <Row className="mx-auto mt-2">
        <div style={{ maxWidth: "1100px" }}>
          Click a card to view the image, tag, and caption information. Click
          the{" "}
          <span>
            <FiThumbsUp size={15} style={{ display: "inline-block" }} />
          </span>{" "}
          to upvote and the{" "}
          <span>
            <FiThumbsDown size={15} style={{ display: "inline-block" }} />
          </span>{" "}
          to downvote. If a submission has one upvote, it will move to
          "Pending." If it has two, it will move to "Approved" and display on
          the time capsule website. One downvote sends the submission to
          "Rejected."
        </div>
      </Row>
      <Row className="mx-auto">
        {loading ? (
          <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
            <Spinner
              className="m-auto"
              animation="border"
              role="status"
              style={{ width: "100px", height: "100px" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row
            className="mx-auto mt-5 justify-content-center"
            style={{ marginBottom: "80px" }}
          >
            {images.map((image, index) => (
              <Image
                setShow={setShow}
                key={index}
                src={image.url}
                color={image.color === "null" ? null : image.color}
                data={image}
                rerender={rerender}
                setRerender={setRerender}
                netId={netId}
              />
            ))}

            {images.length === 0 ? (
              <div style={{ fontWeight: 600, fontSize: "24px", opacity: 0.6 }}>
                No Submissions
              </div>
            ) : null}
          </Row>
        )}
      </Row>
      <ImageModal show={show} setShow={setShow} />
    </div>
  );
};

export default Images;
