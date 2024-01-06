import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";



const UserPage: NextPage = () => {
  const router = useRouter();

  const userId = useMemo(() => router.asPath.replace("/", ""), [router.asPath]);

  return (
    <div>
      <h1>Hello {userId}!</h1>
    </div>
  );
};

export default UserPage;
