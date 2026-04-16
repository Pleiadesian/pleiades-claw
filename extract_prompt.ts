import { buildAgentSystemPrompt } from './src/agents/system-prompt.ts';
import { loadConfig } from './src/config/config.js';
import { resolveDefaultAgentId } from './src/agents/agent-scope.js';
import { resolveAgentWorkspaceDir } from './src/agents/agent-scope-config.js';

async function main() {
    // 1. Load the actual config used by the session
    const cfg = loadConfig();
    
    // 2. Resolve the active agent (Altera)
    const agentId = resolveDefaultAgentId(cfg);
    const workspaceDir = resolveAgentWorkspaceDir(cfg, agentId);

    // 3. Build the prompt with mock runtime data to match your environment
    const prompt = await buildAgentSystemPrompt({
        workspaceDir,
        promptMode: "full",
        runtimeInfo: {
            agentId,
            os: "windows",
            shell: "pwsh",
            channel: "webchat"
        },
        // In reality, OpenClaw passes tools dynamically. 
        // We'll pass the list of tools typically enabled for Altera.
        toolNames: ["read", "write", "edit", "bash", "message", "session_status", "subagents"]
    });

    console.log("-----------------------------------------");
    console.log("--- ACTUAL PLEIADES SYSTEM PROMPT ---");
    console.log("-----------------------------------------");
    console.log(prompt);
    console.log("-----------------------------------------");
}

main().catch(console.error);
