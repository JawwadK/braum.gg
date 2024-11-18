// app/api/summoner/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';
import { getLatestDDragonVersion } from '@/lib/ddragon';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const summonerName = searchParams.get('name');
  const apiKey = process.env.RIOT_API_KEY;

  if (!summonerName) {
    return NextResponse.json({ error: "No summoner name provided" }, { status: 400 });
  }

  try {
    // Get latest Data Dragon version first
    const latestVersion = await getLatestDDragonVersion();
    
    // Parse Riot ID format (name#tagLine)
    const [gameName, tagLine] = summonerName.split('#');
    
    // First get account by riot id
    const accountResponse = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );

    // Get summoner data using PUUID
    const summonerResponse = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountResponse.data.puuid}?api_key=${apiKey}`
    );

    // Get ranked data
    const rankedResponse = await axios.get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerResponse.data.id}?api_key=${apiKey}`
    );

    // Get match history
    const matchlistResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountResponse.data.puuid}/ids?start=0&count=10&api_key=${apiKey}`
    );

    // Get details for each match
    const matchPromises = matchlistResponse.data.map((matchId: string) =>
      axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`)
    );
    const matchesResponse = await Promise.all(matchPromises);
    const matches = matchesResponse.map(response => response.data);

    // Combine all the data with the gameName and tagLine
    const combinedSummonerData = {
      ...summonerResponse.data,
      name: gameName,
      tagLine: tagLine,
      displayName: `${gameName}#${tagLine}`,
      ddragonVersion: latestVersion
    };

    return NextResponse.json({
      summoner: combinedSummonerData,
      ranked: rankedResponse.data,
      matches
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Unable to fetch summoner data' }, { status: 500 });
  }
}