import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";

const TransactionsPage = () => {
  const { bank_id } = useParams();

  if (!bank_id || bank_id === null || !isValidUUIDv4(bank_id))
    return <div className="w-full h-screen p-10">Invalid ID</div>;

  return <div className="w-full h-screen p-10">{bank_id}</div>;
};

export default TransactionsPage;
