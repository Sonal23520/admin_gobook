import * as AppConstant from "../Constant/AppConstant";

export const categoryValidation = (
  categoryName,
  setCategoryNameError,
  categoryFileName,
  setCategoryFileNameError,
  categoryFile
) => {
  if (categoryName === "") {
    setCategoryNameError(true);
  } else {
    setCategoryNameError(false);
  }
  if (categoryFileName === AppConstant.DEFAULT_CATEGORY_UPLOAD_NAME) {
    setCategoryFileNameError(true);
  } else {
    if (categoryFile.type.startsWith(AppConstant.DEFAULT_FILE_TYPE)) {
      setCategoryFileNameError(false);
      return true;
    } else {
      setCategoryFileNameError(true);
      return false;
    }
  }
};

export const bookValidation = (
  categoryValue,
  setcategoryError,
  setgradeError,
  gradeValue,
  bookName,
  setbookNameError,
  setpriceError,
  bookPrice,
  bookQty,
  setqtyError,
  bookFileName,
  bookFile,
  setbookFileNameError
) => {
  if (categoryValue === "") {
    setcategoryError(true);
  } else if (categoryValue.startsWith(AppConstant.GRADE) && gradeValue === "") {
    setcategoryError(false);
    setgradeError(true);
  } else if (bookName === "") {
    setgradeError(false);
    setbookNameError(true);
  } else if (bookPrice === "") {
    setbookNameError(false);
    setpriceError(true);
  } else if (bookQty === "") {
    setpriceError(false);
    setqtyError(true);
  } else if (
    bookFileName === AppConstant.DEFAULT_BOOK_UPLOAD_NAME ||
    !bookFile.type.startsWith(AppConstant.DEFAULT_FILE_TYPE)
  ) {
    setqtyError(false);
    setbookFileNameError(true);
  } else {
    setbookFileNameError(false);
    return true;
  }
};
