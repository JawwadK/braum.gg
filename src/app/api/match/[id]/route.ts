// app/api/match/[id]/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const matchResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${params.id}?api_key=${apiKey}`
    );
    const timelineResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${params.id}/timeline?api_key=${apiKey}`
    );

    return NextResponse.json({
      match: matchResponse.data,
      timeline: timelineResponse.data
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch match data' }, { status: 500 });
  }
}