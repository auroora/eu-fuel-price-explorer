import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  revalidateTag("fuel-prices", "max");

  return Response.json({
    revalidated: true,
  });
}