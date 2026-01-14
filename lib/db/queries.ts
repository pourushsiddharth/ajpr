import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// --- Projects & Financials ---
export async function getProjectDetails() {
  const result = await sql`
    SELECT * FROM projects LIMIT 1;
  `;
  return result[0];
}

// --- Milestones ---
export async function getMilestones(projectId: number) {
  return await sql`
    SELECT * FROM milestones WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Tasks ---
export async function getTasks(projectId: number) {
  // Use a string literal specific to this simple use case or an enum in real apps
  // But here we just fetch all and group on client or separate queries
  return await sql`
    SELECT * FROM tasks WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Users ---
export async function getUsers() {
  return await sql`SELECT * FROM users;`;
}

export async function getUserByEmail(email: string) {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  return result[0];
}

// --- Chat ---
export async function getMessages() {
  // CONSTRAINT: Only fetch messages from the last 24 hours
  return await sql`
    SELECT * FROM messages 
    WHERE created_at > NOW() - INTERVAL '24 hours' 
    ORDER BY created_at ASC;
  `;
}

export async function sendMessage(content: string, senderName: string, senderRole: 'client' | 'developer') {
  // 1. Insert new message
  await sql`
    INSERT INTO messages (content, sender_name, sender_role) 
    VALUES (${content}, ${senderName}, ${senderRole});
  `;

  // 2. Cleanup old messages (Maintenance)
  // This ensures we don't just 'hide' them but actually remove them as requested
  // Doing it on write is a simple way to keep it clean without external cron
  await sql`
    DELETE FROM messages WHERE created_at <= NOW() - INTERVAL '24 hours';
  `;
}
// --- Mutations ---

export async function updateTaskStatus(taskId: number, status: string) {
  // Update the task status
  await sql`
    UPDATE tasks SET status = ${status} WHERE id = ${taskId};
  `;

  // Update Active Task logic: If moving to 'in_progress', potentially mark others as todo/done or just rely on the frontend to show it.
  // For this app, let's keep it simple.
  return { success: true };
}

export async function updateProjectHours(projectId: number, hoursToAdd: number) {
  await sql`
    UPDATE projects 
    SET hours_used = hours_used + ${hoursToAdd},
        progress_percent = LEAST(100, progress_percent + 1) -- Tiny increment for visual feedback
    WHERE id = ${projectId};
  `;
  return { success: true };
}
