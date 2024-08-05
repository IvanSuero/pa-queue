const avg = {
  "20-30 mins": 19.6,
  "40-50 mins": 8,
  "30-40 mins": 16.1,
  "60-70 mins": 2.7,
  "50-60 mins": 8.9,
  "0-10 mins": 16.1,
  "120-130 mins": 0.9,
  "10-20 mins": 27.7
}

const transformed = {
  5: 16.1,
  15: 27.7,
  25: 19.6,
  35: 16.1,
  45: 8,
  55: 8.9,
  65: 2.7,
  75: 0.9
}

interface Props {
  [key: string]: number;
}
interface Converted {
  [key: number]: number;
}

export function getTransformedData({rawData}: {rawData: Props}) {
  try {
    const transformed: Converted = {};

    for (const [key, value] of Object.entries(rawData)) {
      const [start, end] = key.split(' ')[0].split('-').map(Number)
      const middle = (start + end) / 2;
      transformed[middle] = value;
    }
    return calculateAverage({data: transformed})
  } catch (error) {
    console.error(error);
    return {0: 0};
  }
}

function calculateAverage({data}: {data: Converted}) {
  let total = 0
  for (const [key, value] of Object.entries(data)) {
    total += Number(key) * value;
  }
  return total/100
}