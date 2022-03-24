import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../redux/actions";
import { CircularProgress, Button } from "@mui/material";
import { FileUploadRounded } from "@mui/icons-material";
import _ from "lodash";

const Form = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showList, setShowList] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowList(true);
    setPreviewImage(null);
    setLoader(true);
    const data = new FormData();
    data.append("image", image);
    await dispatch(uploadImage(data));
    setLoader(false);
  };

  const handleChange = (e) => {
    setShowList(false);
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="form">
      <form className="form__form" onSubmit={handleSubmit}>
        <Button variant="contained" component="label" sx={{ borderRadius: 10 }}>
          Choose File
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            encType="multipart/form-data"
            hidden
          />
        </Button>
        <Button variant="contained" component="label" sx={{ borderRadius: 10 }}>
          <input type="submit" hidden />
          <FileUploadRounded />
        </Button>
      </form>
      {loader && <CircularProgress className="form__loader" />}
      {previewImage && (
        <img
          src={previewImage}
          alt="main-image"
          className="form__preview-image"
        />
      )}
      {showList && <RenderList urls={urls} />}
    </div>
  );
};

const RenderList = (props) => {
  const { urls } = props;
  return (
    <ul className="form__urls">
      {_.map(urls, (url, i) => {
        return (
          <li key={i}>
            <div className="left">
              <img src={url} alt={`image-${i}`} />
            </div>
            <div className="right">
              <span>{url}</span>
              <Button href={url} variant="text" size="small">
                Download
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Form;
