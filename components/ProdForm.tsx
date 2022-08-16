/* eslint-disable @next/next/no-img-element */
import { FiX } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { NextPage } from "next";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { storage, db } from "../firebase/lib";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const ProdForm: NextPage<{
  setOpenStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenStatus }) => {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
    productImageFile: {} as FileList,
    productDesc: "",
    productImageUrl: "",
  });

  const onSubmit = () => {
    // console.log(product);

    if (
      product.productDesc.length &&
      product.productPrice.length &&
      product.productName.length &&
      product.productImageUrl.length
    ) {
      const storageRef = ref(storage, `images/${product.productImage}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        product.productImageFile?.[0]
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            const prodDoc = await addDoc(collection(db, "Products"), {
              productName: product.productName,
              productPrice: parseInt(product.productPrice),
              productDesc: product.productDesc,
              productImageUrl: downloadURL,
            });

            console.log("document written Id", prodDoc.id);

            setProduct({
              ...product,
              productDesc: "",
              productImageUrl: "",
              productImageFile: {} as FileList,
              productName: "",
              productPrice: "",
              productImage: "",
            });
          });
        }
      );
    } else {
      console.log("fill all the fields");
    }
  };

  const createImageUrl = (files: FileList | null) => {
    if (files != null && files.length) {
      let url = URL.createObjectURL(files?.[0] as any);
      setProduct({
        ...product,
        productImage: files[0].name,
        productImageUrl: url,
        productImageFile: files,
      });
    }
  };

  return (
    <div className="fixed top-0 bottom-0 w-full z-10">
      <div className="w-full h-full bg-gray-500 opacity-30 absolute -z-10"></div>
      <div className="flex justify-center align-middle items-center h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="w-fit bg-white rounded-md shadow-lg border"
        >
          <div className="flex justify-end pt-4 pb-6 px-4">
            <FiX
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setOpenStatus(false)}
            />
          </div>
          <h2 className="text-3xl md:text-4xl text-center">Product form</h2>

          <div className="space-y-3 px-2 pb-4 pt-8 h-[450px] overflow-auto">
            <div className="flex flex-col">
              <label htmlFor="name">Product name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.productName}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    productName: e.target.value,
                  })
                }
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                value={product.productPrice}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    productPrice: e.target.value,
                  })
                }
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">Add image</label>
              {product.productImageUrl.length ? (
                <img
                  src={product.productImageUrl}
                  alt="image"
                  className="w-full h-[200px] pb-2"
                />
              ) : (
                <div className="flex justify-center align-middle items-center w-full h-[200px] mb-2 bg-gray-300 text-2xl text-gray-400">
                  <h2>Image</h2>
                </div>
              )}
              <div className="relative w-[300px] md:w-[400px] h-[60px] rounded-md border-dashed border-2 border-gray-500">
                <div className="absolute top-0 bottom-0 w-full flex justify-center align-middle items-center">
                  <BsCardImage className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  className="opacity-0 h-full w-full cursor-pointer"
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => createImageUrl(e.target?.files)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols={30}
                rows={5}
                value={product.productDesc}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    productDesc: e.target.value,
                  })
                }
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              ></textarea>
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className="px-4 py-1 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Add product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdForm;
