import React, { Component } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = process.env.CLOUDINARY_NAME; // replace with your own cloud name
    const uploadPreset = "video_preset"; // replace with your own upload preset

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: false, //restrict upload to a single file
        folder: "videos", //upload files to the specified folder
        clientAllowedFormats: ["video"], //restrict uploading to image files only
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          await axios.post(`${process.env.BACKEND_BASEURL}/api/video`, {
            videoUrl: result.info.secure_url,
          });
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <Button
        id="upload_widget"
        component="label"
        constiant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Video
      </Button>
    );
  }
}

export default CloudinaryUploadWidget;
