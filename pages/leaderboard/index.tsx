import { db } from "../../firebase/lib";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextPage } from "next";

interface LeaderboardInterface {
  id: string;
  totalAmount: number;
  name: string;
  rank: number;
}

const LeaderBoard: NextPage<{ users: LeaderboardInterface[] }> = ({
  users,
}) => {
  console.log(users);

  return (
    <div className="md:px-20 mt-12 ">
      <h2 className="text-4xl text-center py-4 pb-8">Leader Board</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg border max-w-md mx-auto">
        {users.length ? (
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
              {users.map((user) => (
                <tr key={user.rank} className="bg-white border-b">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.rank}
                  </th>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>nothing to show</div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;

export const getServerSideProps = async () => {
  const collectionRef = collection(db, "Leaderboard");
  const queryForLeaderboard = query(
    collectionRef,
    orderBy("totalAmount", "desc")
  );
  const leaderboardData = await getDocs(queryForLeaderboard);

  let users: LeaderboardInterface[] = [];
  let rank = 1;

  leaderboardData.forEach((data) => {
    users.push({
      id: data.id,
      rank: rank,
      ...data.data(),
    } as LeaderboardInterface);

    rank++;
  });

  return {
    props: { users },
  };
};
