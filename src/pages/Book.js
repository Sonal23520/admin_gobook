/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';

import { db, storage } from '../Firebase';

export const Book = () => {
  const [bookName, setbookName] = useState('');
  const [bookPrice, setbookPrice] = useState('');
  const [bookQty, setbookQty] = useState('');
  const [categoryValue, setcategoryValue] = useState('');
  const [gradeValue, setgradeValue] = useState('');
  const [grades, setgrades] = useState([]);
  const [categoryName, setcategoryName] = useState([]);
  const [bookFileName, setbookFileName] = useState('Upload Book Image');
  const [bookFile, setbookFile] = useState([]);
  const noneGrade = useRef();
  //Validation//
  const [bookNameError, setbookNameError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [qtyError, setqtyError] = useState(false);
  const [categoryError, setcategoryError] = useState(false);
  const [gradeError, setgradeError] = useState(false);
  const [bookFileNameError, setbookFileNameError] = useState(false);
  const [gradeDisableCkeck, setgradeDisableCkeck] = useState(true);

  const [progress, setProgress] = useState(0);
  const [backdrop, setBackdrop] = useState(false);

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = state;
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    db.collection('GoBook').onSnapshot((snapshot) => {
      setcategoryName(snapshot.docs.map((doc) => doc.id));
    });
  }, []);

  function uploadFile(file) {
    if (file.target.files[0]) {
      setbookFileName(file.target.files[0].name);
      setbookFile(file.target.files[0]);
    }
  }

  function validation() {
    if (categoryValue === '') {
      setcategoryError(true);
    } else if (categoryValue.startsWith('Grade') && gradeValue === '') {
      setcategoryError(false);
      setgradeError(true);
    } else if (bookName === '') {
      setgradeError(false);
      setbookNameError(true);
    } else if (bookPrice === '') {
      setbookNameError(false);
      setpriceError(true);
    } else if (bookQty === '') {
      setpriceError(false);
      setqtyError(true);
    } else if (
      bookFileName === 'Upload Book Image' ||
      !bookFile.type.startsWith('image')
    ) {
      setqtyError(false);
      setbookFileNameError(true);
    } else {
      setbookFileNameError(false);
      return true;
    }
  }

  function addBook() {
    if (validation()) {
      const uploadImage = storage
        .ref(`Book_Images/${bookFile.name}`)
        .put(bookFile);

      uploadImage.on(
        'state_changed',
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
            .ref('Book_Images')
            .child(bookFile.name)
            .getDownloadURL()
            .then((url) => {
              setBackdrop(false);
              db.collection('GoBook')
                .doc(categoryValue)
                .collection(
                  categoryValue.startsWith('Grade')
                    ? gradeValue
                    : noneGrade.current.value
                )
                .doc(bookName)
                .set({
                  bookimage: url,
                  bookname: bookName,
                  bookprice: bookPrice,
                  qty: bookQty,
                  date:new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                })
                .then(() => {
                  setSuccessMessage('Book Added');
                  openMessage({
                    vertical: 'top',
                    horizontal: 'center'
                  });
                  clean();
                });
            }).catch((erro) => {
            console.log(erro);
          });
        }
      );
    }
  }

  function clean() {
    setbookFileName('Upload Book Image');
    setbookName('');
    setbookFile([]);
    setbookPrice('');
    setbookQty('');
    setgradeValue('');
    setcategoryValue('');
    setcategoryError(false);
    setgradeError(false);
    setbookNameError(false);
    setpriceError(false);
    setqtyError(false);
    setbookFileNameError(false);
  }

  function openMessage(newState) {
    setState({ open: true, ...newState });
  }

  function closeMessage() {
    setState({ ...state, open: false });
  }

  function gradeDisable(catename) {
    if (catename.startsWith('Grade 1')) {
      setgrades([]);
      setgradeDisableCkeck(false);
      for (let index = 1; index <= 5; index++) {
        setgrades((oldArray) => [...oldArray, `Grade_${index}`]);
      }
    } else if (catename.startsWith('Grade 6')) {
      setgrades([]);
      setgradeDisableCkeck(false);
      for (let index = 6; index <= 10; index++) {
        setgrades((oldArray) => [...oldArray, `Grade_${index}`]);
      }
    } else {
      setgradeDisableCkeck(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>GoBooks Books</title>
      </Helmet>

      {/* ////////////? UTIL START///////// */}
      <Snackbar
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeMessage}
        autoHideDuration={5000}
      >
        <Alert severity="success" onClose={closeMessage} sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      {/* ////////////? UTIL END///////// */}

      <Box
        sx={{
          backgroundColor: 'Background.default',
          height: '100%'
        }}
      >
        <Grid
          flex
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
          container
        >
          <Grid item xs={12} md={6}>
            <Box
              mx={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                // alignItems: "center",
                border: '1px solid gray',
                borderRadius: '10px'
              }}
              px={5}
              py={5}
            >
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '30px'
                }}
              >
                Add Book
              </Typography>
              <FormControl size="small" sx={{ marginBottom: '16px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  error={categoryError}
                  labelId="demo-simple-select-label"
                  value={categoryValue}
                  label="Select Category"
                  onChange={(val) => {
                    setcategoryValue(val.target.value);
                    gradeDisable(val.target.value);
                  }}
                >
                  {categoryName.map((categoryname) => (
                    <MenuItem value={categoryname}>{categoryname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {gradeDisableCkeck ? (
                <TextField
                  inputRef={noneGrade}
                  sx={{ marginBottom: '16px' }}
                  value={'Books'}
                  disabled
                  size="small"
                />
              ) : (
                <FormControl
                  size="small"
                  disabled={gradeDisableCkeck}
                  sx={{ marginBottom: '16px' }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label-grade">
                    Select Grade
                  </InputLabel>
                  <Select
                    error={gradeError}
                    labelId="demo-simple-select-label-grade"
                    value={gradeValue}
                    label="Select Grade"
                    onChange={(val) => {
                      setgradeValue(val.target.value);
                    }}
                  >
                    {grades.map((grade) => (
                      <MenuItem value={grade}>{grade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                size="small"
                fullWidth
                label="Book Name"
                variant="outlined"
                sx={{ marginBottom: '16px' }}
                onChange={(val) => {
                  setbookName(val.target.value);
                }}
                value={bookName}
                error={bookNameError}
                helperText={bookNameError ? 'Please Fill Book Name' : null}
              />
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Book Price"
                variant="outlined"
                sx={{ marginBottom: '16px' }}
                onChange={(val) => {
                  setbookPrice(val.target.value);
                }}
                value={bookPrice}
                error={priceError}
                helperText={priceError ? 'Please Fill Book Price' : null}
              />
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Book Quantity"
                variant="outlined"
                sx={{ marginBottom: '16px' }}
                onChange={(val) => {
                  setbookQty(val.target.value);
                }}
                value={bookQty}
                error={qtyError}
                helperText={qtyError ? 'Please Fill Book Quantity' : null}
              />
              <Button
                variant="outlined"
                component="label"
                color={bookFileNameError ? 'error' : 'primary'}
              >
                {bookFileName}
                <input type="file" hidden onChange={uploadFile}/>
              </Button>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: 'red',
                  display: bookFileNameError ? 'flex' : 'none',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Please Add Image
              </Typography>
              <Button
                sx={{ marginTop: '16px' }}
                variant="contained"
                onClick={addBook}
              >
                Add Book
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <h4>Book update and remove not completed yet</h4>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
