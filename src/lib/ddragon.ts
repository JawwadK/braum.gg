// src/lib/ddragon.ts
import axios from 'axios';

export async function getLatestDDragonVersion() {
  try {
    const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
    return response.data[0]; // First entry is always the latest version
  } catch (error) {
    console.error('Failed to fetch latest Data Dragon version:', error);
    return '14.5.1'; // Fallback to a known recent version
  }
}