/* eslint-disable @next/next/no-img-element */
import Card from "../../components/Card";
import ProdForm from "../../components/ProdForm";
import { useState, useEffect } from "react";
import { ProductInterface } from "../../interfaces";
import useAuth from "../../components/hooks/authHook";
import { useRouter } from "next/router";
import { db } from "../../firebase/lib";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { AiOutlineReload } from "react-icons/ai";
import Link from "next/link";

const AdminPage = () => {
  const [isFormOpen, setOpenStatus] = useState<boolean>(false);
  const [products, setProducts] = useState([] as ProductInterface[]);
  const [isAdmin, setAdmin] = useState(false);
  const { isUser, userInfo } = useAuth();
  const router = useRouter();

  const verifyUser = async () => {
    if (isUser) {
      const docRef = doc(db, "Admin", userInfo.email as string);
      const dataRef = await getDoc(docRef);

      if (dataRef.exists()) {
        setAdmin(true);
      } else {
        setAdmin(false);
        router.push("/");
      }
    }
  };

  useEffect(() => {
    verifyUser();

    makeRequestForProducts();

    // console.log(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser, isAdmin, isFormOpen]);

  const makeRequestForProducts = async () => {
    const data = await fetch("/api/getProd");
    const json = (await data.json()) as ProductInterface[];
    console.log(json);
    setProducts(json);
    console.log(products);
  };

  const removeProduct = async (id: string) => {
    const docRef = doc(db, "Products", id);
    await deleteDoc(docRef);
    makeRequestForProducts();
  };

  return (
    <div className="divide-y divide-gray-400 px-1 sm:px-4">
      {isAdmin ? (
        <>
          <div>
            <h3 className="text-3xl text-center pt-4 pb-6 sm:pt-12 sm:pb-8 md:text-5xl md:pb-12">
              Admin panel
            </h3>

            <div className="pb-6 sm:pb-12 flex justify-center">
              <button
                className="py-1 text-xl text-white bg-green-500 rounded-md px-4 hover:bg-green-600 md:px-6 md:py-2"
                onClick={() => setOpenStatus(true)}
              >
                Add product
              </button>
              {isFormOpen && <ProdForm setOpenStatus={setOpenStatus} />}
            </div>
          </div>

          <div className="pt-12 pb-12">
            <div className="flex justify-center align-middle items-center flex-wrap md:px-6">
              {products.length ? (
                products.map((prod) => (
                  <div
                    key={prod.productID}
                    className="w-[300px] rounded-md shadow-xl m-2"
                  >
                    <img
                      src={prod.productImageUrl}
                      alt={"img"}
                      className="w-full h-[300px] rounded-t-md bg-gray-400"
                    />
                    <div className="px-1 pb-2">
                      <h2 className="text-3xl pt-2 text-gray-500 hover:text-gray-600 cursor-pointer">
                        {prod.productName}
                      </h2>
                      <h3 className="text-xl text-gray-400 pb-4">
                        ${prod.productPrice}
                      </h3>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => removeProduct(prod.productID)}
                          className="text-xl text-red-500 rounded-md px-4 py-1 hover:text-white hover:bg-red-500 border border-red-500"
                        >
                          Remove
                        </button>
                        <Link href={`/prodview/${prod.productID}`}>
                          <a className="text-xl text-white bg-green-500 rounded-md px-4 py-1 hover:bg-green-600">
                            Buy now
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-screen flex justify-center align-middle items-center">
                  <h2 className="text-5xl font-semibold text-gray-400">
                    Nothing to show
                  </h2>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center align-middle items-center">
          <AiOutlineReload className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
