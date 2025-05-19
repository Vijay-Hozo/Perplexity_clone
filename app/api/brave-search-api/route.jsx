import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userInput, searchType } = await req.json();

  const res = await axios.get(
    "https://api.search.brave.com/res/v1/web/search?q=" + userInput,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY,
      },
    }
  );
  return NextResponse.json(res.data);
}
