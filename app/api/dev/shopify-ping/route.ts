import { NextResponse } from "next/server";
import {
  ShopifyApiError,
  ShopifyConfigError,
  shopifyFetch,
} from "@/lib/shopify";

export const dynamic = "force-dynamic";

const PING_QUERY = /* GraphQL */ `
  {
    shop {
      name
      primaryDomain {
        host
        url
      }
    }
  }
`;

type PingResponse = {
  shop: {
    name: string;
    primaryDomain: { host: string; url: string };
  };
};

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 404 });
  }

  try {
    const data = await shopifyFetch<PingResponse>(PING_QUERY, undefined, {
      cache: "no-store",
    });
    return NextResponse.json({
      ok: true,
      shop: data.shop.name,
      host: data.shop.primaryDomain.host,
    });
  } catch (err) {
    if (err instanceof ShopifyConfigError) {
      return NextResponse.json(
        { ok: false, kind: "config", message: err.message },
        { status: 400 },
      );
    }
    if (err instanceof ShopifyApiError) {
      return NextResponse.json(
        { ok: false, kind: "api", status: err.status, message: err.message },
        { status: 502 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        kind: "unknown",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
