// /pages/api/champions/details.ts
import axios from "axios";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  const idArray = ids.split(",").map(id => id.trim());

  try {
    // Fetch all champion data from Riot Data Dragon
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json`
    );

    const allChampions = response.data.data;

    // Filter champions based on the provided IDs (the 'key' in the data corresponds to the champion's ID)
    const selectedChampions = Object.values(allChampions).filter((champion: any) =>
      idArray.includes(champion.key)
    );

    return NextResponse.json(selectedChampions);
  } catch (error) {
    console.error("Error fetching champion details:", error);
    return NextResponse.json({ error: 'Unable to fetch champion details' }, { status: 500 });
  }
}
