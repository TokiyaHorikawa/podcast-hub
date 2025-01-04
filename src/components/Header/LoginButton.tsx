import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href={"/login"}>
      <Button>ログイン</Button>
    </Link>
  );
};

export default LoginButton;
