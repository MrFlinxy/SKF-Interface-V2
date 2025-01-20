import { useSession } from "next-auth/react";

const UserToken = () => {
  const { data } = useSession();
  return data;
};

export default UserToken;
