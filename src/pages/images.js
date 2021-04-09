import { useState, useEffect, useCallback } from "react";
import { getAll, getColor, getImage } from "../util/api";
import Image from "../components/image";
import ImageModal from "../components/imagemodal";
import { Row, Spinner } from "react-bootstrap";

const Images = ({ status }) => {
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [show, setShow] = useState({});

  const fetchImage = async (filename) => {
    // console.log(filename);
    let image = await getImage(filename);
    return image;
  };

  const fetchColor = async (id) => {
    let color = await getColor(id);
    return color;
  };

  const fetchImages = useCallback(async () => {
    let data = await getAll(status);
    data = data.data;
    const files = data.filenames;
    const color_ids = data.color_ids;

    // console.log(files);
    // console.log(color_ids);

    if (!files.length) {
      setImages([]);
      setImageData([]);
    }

    if (!color_ids.length) {
      setColorData([]);
    }

    if (!files.length && !color_ids.length) {
      setLoading(false);
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
          tags: fetchedImage.data.tags,
          caption: fetchedImage.data.caption,
          filename: file,
        });
      }
      if (fetched.length === files.length) {
        setImageData(metadata.reverse());
        setImages(fetched.reverse());
      }
      if (colors.length + fetched.length === color_ids.length + files.length) {
        setLoading(false);
      }
    });

    let colors = [];

    color_ids.forEach(async (id) => {
      let fetchedColor = await fetchColor(id);
      if (fetchedColor && fetchedColor.data) {
        colors.push({
          color: fetchedColor.data.color,
          upvoted: fetchedColor.data.upvoted,
          downvoted: fetchedColor.data.downvoted,
          tags: fetchedColor.data.tags,
          caption: fetchedColor.data.caption,
        });
      }
      if (colors.length + fetched.length === color_ids.length + files.length) {
        setLoading(false);
      }
      if (colors.length === color_ids.length) {
        setColorData(colors);
      }
    });
  }, [status]);

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [status, rerender, fetchImages]);

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
        <Row
          className="mx-auto mt-5 justify-content-center"
          style={{ marginBottom: "80px" }}
        >
          {images.map((image, index) => (
            <Image
              setShow={setShow}
              key={index}
              src={`data:${imageData[index].contentType};base64,${image}`}
              data={imageData[index]}
              rerender={rerender}
              setRerender={setRerender}
            />
          ))}
          {colorData.map((color, index) => (
            <Image
              setShow={setShow}
              key={index + images.length}
              color={color.color}
              data={color}
              rerender={rerender}
              setRerender={setRerender}
            />
          ))}
        </Row>
      )}
      <ImageModal show={show} setShow={setShow} />
    </div>
  );
};

export default Images;
