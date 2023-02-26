import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function getTokenFn(req) {
  const token = await getToken({ req, secret });
  return token;
}

export default getTokenFn;
