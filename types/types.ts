export interface Ride {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
  park: string;
}

export interface Park {
  name: string;
  id: string;
  logo: string;
}