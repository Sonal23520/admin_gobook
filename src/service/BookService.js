import { bookValidation } from "../util/Validation";
import { db, storage } from "../Firebase";
import * as AppConstant from "../Constant/AppConstant";

export const addNewBook = (
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
  setbookFileNameError,
  setBackdrop,
  setProgress,
) => {
    return new Promise((resolve, reject) => {
        if (
            bookValidation(
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
            )
        ) {
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
                            setBackdrop(false);
                            db.collection(AppConstant.BOOK_COLLECTION)
                                .doc(bookName)
                                .set({
                                    bookname: bookName,
                                    bookprice: bookPrice,
                                    qty: bookQty,
                                    bookimage: url,
                                })
                                .then(() => {
                                    resolve(true)
                                }).catch(reason => {
                                    resolve(false)
                            });
                        })
                        .catch((erro) => {
                            console.log(erro);
                        });
                }
            );
        }
    })

};
