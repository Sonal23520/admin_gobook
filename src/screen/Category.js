/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as AppConstant from "../Constant/AppConstant";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { addNewCategory } from "../service/CategoryService";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryFileName, setCategoryFileName] = useState(
    AppConstant.DEFAULT_CATEGORY_UPLOAD_NAME
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
  const [alertColor, setAlertColor] = useState();

  function uploadFile(file) {
    if (file.target.files[0]) {
      setCategoryFileName(file.target.files[0].name);
      setCategoryFile(file.target.files[0]);
    }
  }

  async function addCategory() {
    await addNewCategory(
      categoryName,
      setCategoryNameError,
      categoryFileName,
      setCategoryFileNameError,
      categoryFile,
      setBackdrop,
      setProgress
    ).then((value) => {
      setAlertColor(value ? "success" : "error");
      setSuccessMessage(value ? "Category Added" : "Category Added Failed");
      openMessage({
        vertical: "top",
        horizontal: "center",
      });
      clean();
    });
  }

  function clean() {
    setCategoryFileName(AppConstant.DEFAULT_CATEGORY_UPLOAD_NAME);
    setCategoryName("");
    setCategoryFile([]);
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

      {/* ////////////? UTIL START///////// */}
      <Snackbar
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeMessage}
        autoHideDuration={2000}
      >
        <Alert
          severity={alertColor}
          onClose={closeMessage}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* ////////////? UTIL END///////// */}

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
            <h4>Category update and remove not completed yet</h4>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
