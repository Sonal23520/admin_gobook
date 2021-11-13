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
  productValue,
  setproductError,
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
  if (categoryValue.id === AppConstant.ZERO) {
    setcategoryError(true);
  } else if (productValue.id === AppConstant.ZERO) {
    setproductError(true);
    setcategoryError(false);
  } else if (categoryValue.name.startsWith(AppConstant.GRADE) && gradeValue === AppConstant.EMPTY) {
    setcategoryError(false);
    setgradeError(true);
  } else if (bookName === AppConstant.EMPTY) {
    setgradeError(false);
    setbookNameError(true);
  } else if (bookPrice === AppConstant.EMPTY) {
    setbookNameError(false);
    setpriceError(true);
  } else if (bookQty === AppConstant.EMPTY) {
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
