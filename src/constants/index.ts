// Current stable version for Data Dragon
export const DDRAGON_VERSION = '14.2.1'
export const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`
// Function to handle missing images
export const getFallbackProfileIcon = (iconId: number) => {
  // Default to icon 1 if the requested icon isn't found
  return `${DDRAGON_BASE_URL}/img/profileicon/1.png`
}