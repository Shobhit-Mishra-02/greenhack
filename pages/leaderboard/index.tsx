const LeaderBoard = () => {
  return (
    <div className="md:px-20 mt-12 ">
      <h2 className="text-4xl text-center py-4 pb-8">Leader Board</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg border max-w-md mx-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Rank
              </th>
              <th scope="col" className="py-3 px-6">
                Customer name
              </th>
              <th scope="col" className="py-3 px-6">
                Total purchase
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="py-4 px-6">Manan</td>
              <td className="py-4 px-6">1200</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                2
              </th>
              <td className="py-4 px-6">Kabir</td>
              <td className="py-4 px-6">1100</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                3
              </th>
              <td className="py-4 px-6">Hari</td>
              <td className="py-4 px-6">1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
