import { categoryValidation } from "../util/Validation";
import { db, storage } from "../Firebase";
import * as AppConstant from "../Constant/AppConstant";

export const addNewCategory = (
  categoryName,
  setCategoryNameError,
  categoryFileName,
  setCategoryFileNameError,
  categoryFile,
  setBackdrop,
  setProgress
) => {
  return new Promise((resolve, reject) => {
    if (
      categoryValidation(
        categoryName,
        setCategoryNameError,
        categoryFileName,
        setCategoryFileNameError,
        categoryFile
      )
    ) {
      generateCategoryId(setBackdrop).then((categoryId) => {
        const uploadImage = storage
          .ref(`${AppConstant.URL_CATEGORY_FOLDER}/${categoryFile.name}`)
          .put(categoryFile);

        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref(AppConstant.URL_CATEGORY_FOLDER)
              .child(categoryFile.name)
              .getDownloadURL()
              .then((url) => {
                db.collection(AppConstant.CATEGORY_COLLECTION)
                  .doc(categoryName)
                  .set({
                    id: categoryId,
                    name: categoryName,
                    image_url: url,
                  })
                  .then(() => {
                    setBackdrop(false);
                    resolve(true);
                  })
                  .catch((reason) => {
                    resolve(false);
                  });
              });
          }
        );
      });
    }
  });
};

const generateCategoryId = (setBackdrop) => {
  setBackdrop(true);
  return new Promise((resolve, reject) => {
    db.collection(AppConstant.CATEGORY_COLLECTION)
      .orderBy("id", "desc")
      .limit(1)
      .get()
      .then((value) => {
        if (AppConstant.ZERO !== value.size) {
          value.forEach((result) => {
            resolve(parseInt(result.data().id) + 1);
          });
        } else {
          resolve(AppConstant.ZERO + 1);
        }
      });
  });
};
