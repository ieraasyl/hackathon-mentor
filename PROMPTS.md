I used only Cursor's Composer 2 model to generate some code, here are prompts I used.

First prompt

````text
Read and understand the codebase created by `pnpm create cloudflare@latest --template cloudflare/agents-starter`

Here's my types.ts I'm building for my hackathon-mentor project:

```ts
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
```

For now it's used in server.ts like this:

```ts
export class HackathonMentor extends AIChatAgent<Env, TeamState> {
  initialState: TeamState = {
    team_name: "",
    project_idea: "",
    stack: "",
    checklist: null,
    started_at: null
  };
```

I need you to generate a prompts.ts file that exports a buildSystemPrompt(state: TeamState): string function.

Here's my idea:
It should inject team's current state, e.g. team name, idea, stack, etc.
A helper function to render the checklist. It should return "No checklist yet." if null or empty. Otherwise it should show progress count and a list with [x] or [ ] markdown
It should calculate how much time elapsed and how much hours remain using state.started_at (hackathons are 24h by default)
Its tone should be action-oriented, concise. It should prioritize shipping a demoable MVP (e.g. forbid new features if less than 6h remain, prepare for demo if less than 2 hours remain, etc.). It should always commit to a singe stack recommendation, do not give the user list of options. If context is missing, it should ask only one clarifying question.
````

Second prompt

```text
Now, please generate a tools.ts file.

It should export createTools(state: TeamState, setState: (update: Partial<TeamState>) => void) that returns an object of tools using ai SDK and zod.

Internal logic and tools needed:
there should be buildDefaultChecklist() function that maps tasks setup/deploy, schema/API, UI/data wiring, core feature, bug fixes, error handling, polish, demo rehearsal to 4 time blocks each 6 hours from 0 to 24, two tasks per block.

evaluate_idea tool that takes idea, team_size, and optionally stack, updates the state with the idea and returns if it's feasible, e.g. if the idea is more than 30 words, mark it 'medium' feasibility with a warning to narrow scope; otherwise 'high'. It should also add a note to properly distribute work, based on the number of members.

suggest_stack tool that takes project_type, team_skills, and has_backend.It should persists a recommendation to state: "Astro" if no backend is needed, otherwise "TanStack Start on Cloudflare Workers + D1".

generate_checklist tool that triggers the buildDefaultChecklist() logic and saves the result to team state.

mark_task_done tool that validates the checklist and the task before marking the task to done.

generate_team_name tool takes idea and an optional vibe (serious, funny, technical) and returns three suggested names based on a slugified version of the idea.

Each tool's execute handler should call setState where it should
```

Third prompt:

```text
Now when everything's ready, cleanup server.ts from demo and use prompt, types and tools
in app.tsx every team should get unique URL they can share with each other.
```

Fourth prompt:

```text
Read and understand the codebase
Modify README.md
It should contain project documentation and clear running instructions to try out components (either locally or via deployed link), nothing more
```

Fifth prompt:

```text
Format @PROMPTS.md without changing a word, prompts should be copyable plaintext blocks
```

After that, I did everything myself because essentially everything's finished and it would take less time by hand than by prompting the agent.
Of course, throughout the process I thoroughly reviewed the output of the model, read documentation and wrote some code/markdown myself.
