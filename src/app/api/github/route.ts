import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Koyach";

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

export async function GET() {
  const query = `{
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("GitHub API error:", res.status, text);
    return NextResponse.json({ error: "GitHub API error", status: res.status }, { status: 502 });
  }

  const json = await res.json();

  if (json.errors) {
    console.error("GitHub GraphQL errors:", JSON.stringify(json.errors));
    return NextResponse.json({ error: "GitHub GraphQL error" }, { status: 502 });
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ error: "No data" }, { status: 404 });
  }

  const days = calendar.weeks.flatMap((w: Week) =>
    w.contributionDays.map((d: ContributionDay) => ({
      date: d.date,
      count: d.contributionCount,
    }))
  );

  return NextResponse.json({
    totalContributions: calendar.totalContributions,
    days,
  });
}
