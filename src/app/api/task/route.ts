import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const status = searchParams.get("status");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks?page=${page}&limit=${limit}&status=${status}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { statusText: data.message },
      { status: response.status },
    );
  }

  return NextResponse.json({
    tasks: data,
  });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { statusText: data.message },
      { status: response.status },
    );
  }

  return NextResponse.json({ task: data }, { status: 201 });
}
