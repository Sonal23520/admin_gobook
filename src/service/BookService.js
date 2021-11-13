import { bookValidation } from "../util/Validation";
import { db, storage } from "../Firebase";
import * as AppConstant from "../Constant/AppConstant";

export const addNewBook = (
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
  setbookFileNameError,
  setBackdrop,
  setProgress
) => {
  return new Promise((resolve, reject) => {
    if (
      bookValidation(
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
      )
    ) {
      generateBookId(setBackdrop).then((bookId) => {
        const uploadImage = storage
          .ref(`${AppConstant.URL_BOOK_FOLDER}/${bookFile.name}`)
          .put(bookFile);

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
              .ref(AppConstant.URL_BOOK_FOLDER)
              .child(bookFile.name)
              .getDownloadURL()
              .then((url) => {
                db.collection(AppConstant.BOOK_COLLECTION)
                  .doc(bookName)
                  .set({
                    category_id: categoryValue.id,
                    product_id: productValue.id,
                    grade:
                      AppConstant.EMPTY === gradeValue
                        ? "None"
                        : gradeValue.split("_")[1],
                    book_id: bookId,
                    bookname: bookName,
                    bookprice: bookPrice,
                    qty: bookQty,
                    bookimage: url,
                  })
                  .then(() => {
                    setBackdrop(false);
                    resolve(true);
                  })
                  .catch((reason) => {
                    resolve(false);
                  });
              })
              .catch((erro) => {
                console.log(erro);
              });
          }
        );
      });
    }
  });
};

const generateBookId = (setBackdrop) => {
  setBackdrop(true);
  return new Promise((resolve, reject) => {
    db.collection(AppConstant.BOOK_COLLECTION)
      .orderBy("book_id", "desc")
      .limit(1)
      .get()
      .then((value) => {
        if (AppConstant.ZERO !== value.size) {
          value.forEach((result) => {
            resolve(parseInt(result.data().book_id) + 1);
          });
        } else {
          resolve(AppConstant.ZERO + 1);
        }
      });
  });
};
