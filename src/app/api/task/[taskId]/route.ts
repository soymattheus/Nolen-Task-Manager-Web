import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    taskId: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { taskId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
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

export async function PUT(req: Request, { params }: Params) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { taskId } = await params;

  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { statusText: data.message },
      { status: response.status },
    );
  }

  return NextResponse.json({ task: data }, { status: 200 });
}
