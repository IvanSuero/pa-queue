export function getDateDifference({last_updated}: {last_updated: string}) {
  const date = Date.now()
  const diff = (date - Date.parse(last_updated)) / 60000
  return (diff > 60 ? `${Math.floor((date - Date.parse(last_updated)) / 3600000)}h` : `${Math.floor(diff)} min`)
}