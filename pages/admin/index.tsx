import Card from "../../components/Card";
import ProdForm from "../../components/ProdForm";
import { useState } from "react";

const AdminPage = () => {
  const [isFormOpen, setOpenStatus] = useState<boolean>(false);

  return (
    <div className="divide-y divide-gray-400 px-1 sm:px-4">
      <div>
        <h3 className="text-3xl text-center pt-4 pb-6 sm:pt-12 sm:pb-8 md:text-5xl md:pb-12">
          Admin panel
        </h3>

        <div className="pb-6 sm:pb-12 flex justify-center">
          <button
            className="py-1 text-xl text-white bg-blue-500 rounded-md px-4 hover:bg-blue-600 md:px-6 md:py-2"
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
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
