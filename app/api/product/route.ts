import { URL } from "@/app/constants/external-routes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") || "";
  try {
    const { searchParams } = req.nextUrl;

    const productId = searchParams.get("product_id") || "";

    const response = await axios.get(`${URL}/api/web/v1/product`, {
      headers: {
        Authorization: token,
      },
      params: {
        productId: productId,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization") || "";
  try {
    const data = await req.json();
    const response = await axios.post(`${URL}/api/web/v1/product`, data, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization") || "";
  try {
    const data = await req.json();
    const response = await axios.put(`${URL}/api/web/v1/product`, data, {
      headers: { Authorization: token },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to put" }, { status: 500 });
  }
}
