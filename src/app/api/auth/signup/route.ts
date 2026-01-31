import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const payload = {
    name: body.name,
    last_name: body.last_name,
    email: body.email,
    password: body.password,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { statusText: data.message },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
