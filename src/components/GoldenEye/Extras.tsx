import { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import { BiImageAdd } from "react-icons/bi";
import GElogo from "./images/GElogo.png";
import { useLayout } from "./LayoutContext";

export default function Extras() {
  const [images, setImages] = useState<string[]>([GElogo]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { navbarHeight } = useLayout();

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  return (
    <div className="carousel-div" style={{ paddingTop: navbarHeight }}>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div className="circle upload-img-btn" title="add images">
        <BiImageAdd
          size="50%"
          style={{ cursor: "pointer" }}
          onClick={handleUploadButtonClick}
        />
      </div>

      <Carousel data-bs-theme="dark">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image} alt={`slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
