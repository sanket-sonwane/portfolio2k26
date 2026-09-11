export interface PlaygroundAchievement {
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

export const playgroundAchievements: PlaygroundAchievement[] = [
  {
    id: "nvidia-workshop",
    title: "Invited to NVIDIA Nemotron Workshop",
    subtitle: "Presented an AI-powered cybersecurity project to AI engineers, NVIDIA teams, and industry professionals",
    date: "2025",
  },
  {
    id: "research-paper",
    title: "Q2 Journal Paper Submission",
    subtitle: "“Lightweight Trust-Based Detection of Rogue Nodes in MEC” submitted to AEUE",
    date: "2025",
  },
  {
    id: "tpc-head",
    title: "TPC Head, PVPIT",
    subtitle: "Led placement coordination and student engagement",
    date: "2024",
  },
  {
    id: "campus-crew",
    title: "HackerRank Campus Crew Lead",
    subtitle: "Led campus-wide coding initiatives; hosted 3+ state-level and 1 international event",
    date: "2024",
  },
];
