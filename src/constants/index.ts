// src/constants/index.ts

// Update to latest Data Dragon version (as of March 2024)
export const DDRAGON_VERSION = '14.5.1'
export const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`

export const getProfileIconUrl = (iconId: number) => {
  return `${DDRAGON_BASE_URL}/img/profileicon/${iconId}.png`
}

export const getFallbackProfileIcon = () => {
  return `${DDRAGON_BASE_URL}/img/profileicon/1.png`
}