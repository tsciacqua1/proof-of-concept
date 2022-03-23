import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "./redux/actions";
import _ from "lodash";
import "./scss/global.scss";

const App = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const data = new FormData();
    data.append("image", image);
    await dispatch(uploadImage(data));
    setLoader(false);
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          encType="multipart/form-data"
        />
        {loader && <span>Loading</span>}
        <input type="submit" value="Upload" />
      </form>
      {image && <img src={previewImage} alt="img" />}
      <div className="app__urls">
        <ul>
          {_.map(urls, (url, i) => {
            return (
              <li key={i}>
                <a href={url}>
                  <img src={url} alt="image" />
                  <span>{url}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
