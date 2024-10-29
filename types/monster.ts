export type Saves = {
  name: string;
  modifier: number;
}[];
export type Skills = {
  name: string;
  modifier: number;
}[];

export type Traits = {
  name: string;
  description: string;
}[];

export type Actions = {
  title: string;
  content: { name: string; description: string }[];
}[];
