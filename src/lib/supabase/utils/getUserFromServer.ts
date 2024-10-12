import { GetServerSidePropsContext } from "next";
import { createClient } from "./server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// server componentを想定している
export async function getUserFromServer(context: GetServerSidePropsContext) {
  const { req } = context;
  const token = req.cookies["sb:token"];

  if (!token) {
    return null;
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser(token);
  const { user } = data;

  if (error || !user) {
    return null;
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: user.email },
  });

  return dbUser;
}
