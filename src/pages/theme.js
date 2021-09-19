import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@material-ui/core";

import { db, storage } from "../Firebase";

export const Theme = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryFileName, setCategoryFileName] = useState(
    "Upload Category Image"
  );
  const [categoryFile, setCategoryFile] = useState([]);

  //Validation//
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [categoryFileNameError, setCategoryFileNameError] = useState(false);

  const [progress, setProgress] = useState(0);
  const [backdrop, setBackdrop] = useState(false);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [successMessage, setSuccessMessage] = useState("");

  function uploadFile(file) {
    if (file.target.files[0]) {
      setCategoryFileName(file.target.files[0].name);
      setCategoryFile(file.target.files[0]);
    }
  }

  function addCategory() {
    if (categoryName === "") {
      setCategoryNameError(true);
    } else {
      setCategoryNameError(false);
    }
    if (categoryFileName === "Upload Category Image") {
      setCategoryFileNameError(true);
    } else {
      if (categoryFile.type.startsWith("image")) {
        setCategoryFileNameError(false);
      } else {
        setCategoryFileNameError(true);
      }
    }

    if (categoryNameError === false && categoryFileNameError === false) {
      const uploadImage = storage
        .ref(`Category_Images/${categoryFile.name}`)
        .put(categoryFile);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setBackdrop(true);
          setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("Category_Images")
            .child(categoryFile.name)
            .getDownloadURL()
            .then((url) => {
              setBackdrop(false);
              db.collection("GoBook")
                .doc(categoryName)
                .set({
                  name: categoryName,
                  image_url: url,
                })
                .then(() => {
                  setSuccessMessage("Category Added");
                  openMessage({
                    vertical: "top",
                    horizontal: "center",
                  });
                });
            });
        }
      );
    }
  }

  function openMessage(newState) {
    setState({ open: true, ...newState });
  }

  function closeMessage() {
    setState({ ...state, open: false });
  }
  return (
    <>
      <Helmet>
        <title>GoBooks Category</title>
      </Helmet>
      {/* //! Snackbat// */}
      <Snackbar
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeMessage}
        autoHideDuration={5000}
      >
        <Alert severity="success" onClose={closeMessage} sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      {/* //! Backdrop// */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: "Background.default",
          height: "100%",
        }}
        p={2}
      >
        <Grid
          flex
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
          container
        >
          <Grid item xs={12} md={6}>
            <Box
              m={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                // alignItems: "center",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
              px={6}
              py={6}
            >
              <Typography
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                Add Category
              </Typography>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                sx={{ marginBottom: "16px" }}
                onChange={(val) => {
                  setCategoryName(val.target.value);
                }}
                value={categoryName}
                error={categoryNameError}
                helperText={
                  categoryNameError ? "Please Fill Category Name" : null
                }
              />
              <Button
                variant="outlined"
                component="label"
                color={categoryFileNameError ? "error" : "primary"}
              >
                {categoryFileName}
                <input type="file" hidden onChange={uploadFile} />
              </Button>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "red",
                  display: categoryFileNameError ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Please Add Image
              </Typography>
              <Button
                sx={{ marginTop: "16px" }}
                variant="contained"
                onClick={addCategory}
              >
                Add Category
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <h4>sd</h4>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
