import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/lib";
import { getDocs, collection } from "firebase/firestore";

interface productInterface {
  productId: string;
  productDesc: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const collectionRef = collection(db, "Products");
    const data = await getDocs(collectionRef);

    let products: productInterface[] = [];

    data.forEach((prod) => {
      const product = {
        productID: prod.id,
        ...prod.data(),
      };
      products.push(product as unknown as productInterface);
    });

    res.send(products);
  }
};

export default handler;
