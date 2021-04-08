import { useState, useEffect } from "react";
import { getAll, getImage } from "../util/api";
import Image from "../components/image";
import { Row, Spinner } from "react-bootstrap";

const Images = ({ status }) => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(0);

  const fetchImage = async (filename) => {
    // console.log(filename);
    let image = await getImage(filename);
    return image;
  };

  const fetchImages = async () => {
    let files = await getAll(status);
    files = files.data;

    if (!files.length) {
      setLoading(false);
      setImages([]);
      setData([]);
      return;
    }

    let fetched = [];
    let metadata = [];

    files.forEach(async (file, index) => {
      let fetchedImage = await fetchImage(file);
      if (fetchedImage && fetchedImage.data && fetchedImage.data.data) {
        fetched.push(fetchedImage.data.data);
        metadata.push({
          contentType: fetchedImage.data.contentType,
          upvoted: fetchedImage.data.upvoted,
          downvoted: fetchedImage.data.downvoted,
          filename: file,
        });
      }
      if (fetched.length === files.length) {
        setData(metadata.reverse());
        setImages(fetched.reverse());
        setLoading(false);
      }
    });
  };

  useEffect(async () => {
    setLoading(true);
    await fetchImages();
  }, [status, rerender]);

  return (
    <div className="d-flex">
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
        <Row className="mx-auto my-auto justify-content-center">
          {images.map((image, index) => (
            <Image
              key={index}
              src={`data:${data[index].contentType};base64,${image}`}
              data={data[index]}
              rerender={rerender}
              setRerender={setRerender}
            />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Images;
