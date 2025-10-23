import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "@/app/constants/external-routes";

export async function GET(req: NextRequest) {
  const tokenHeader = req.headers.get("authorization") || "";
  const token = tokenHeader.startsWith("Bearer ")
    ? tokenHeader.slice(7)
    : tokenHeader;

  try {
    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const response = await axios.get(`${URL}/api/web/v1/products`, {
      headers: {
        Authorization: token,
      },
      params: {
        page,
        limit,
        search,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
