export interface ChecklistItem {
  block: "0-6h" | "6-12h" | "12-18h" | "18-24h";
  task: string;
  done: boolean;
}

export interface TeamState {
  team_name: string;
  project_idea: string;
  stack: string;
  checklist: ChecklistItem[] | null;
  started_at: number | null;
}
