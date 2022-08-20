import Card from "../../components/Card";
import ProdForm from "../../components/ProdForm";
import { useState, useEffect } from "react";
import { ProductInterface } from "../../interfaces";
import useAuth from "../../components/hooks/authHook";
import { useRouter } from "next/router";
import { db } from "../../firebase/lib";
import { doc, getDoc } from "firebase/firestore";

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
  }, [isUser, isAdmin]);

  const makeRequestForProducts = async () => {
    const data = await fetch("/api/getProd");
    const json = (await data.json()) as ProductInterface[];
    console.log(json);
    setProducts(json);
    console.log(products);
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

          <div>
            <div className="flex justify-center pt-8 pb-4 sm:pt-12 sm:pb-8">
              <input
                type="text"
                placeholder="search..."
                className="px-2 py-1 rounded-md border border-gray-400 w-[300px]"
              />
            </div>

            <div className="flex justify-center align-middle items-center flex-wrap md:px-6">
              {products.length ? (
                products.map((prod) => (
                  <Card
                    adminCard={true}
                    key={prod.productID}
                    productImageUrl={prod.productImageUrl}
                    productName={prod.productName}
                    productPrice={prod.productPrice.toString()}
                    id={prod.productID}
                  />
                ))
              ) : (
                <h2>nothing to show</h2>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>checking are you admin!</div>
      )}
    </div>
  );
};

export default AdminPage;
