import React, { useState } from "react";

import CloudinaryUploadWidget from "./components/CloudinaryUploadWidget";

const App = () => {
  return (
    <>
      <h1>Enter to upload your video</h1>

      <CloudinaryUploadWidget />
    </>
  );
};

export default App;
