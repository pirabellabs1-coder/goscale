import { sql } from "@vercel/postgres";

// ── Admin users (auth) ──
let _adminTableEnsured = false;
export async function ensureAdminUsersTable() {
  if (_adminTableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      reset_token_hash TEXT,
      reset_token_expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  _adminTableEnsured = true;
}

export async function getAdminUserByEmail(email: string) {
  await ensureAdminUsersTable();
  const { rows } = await sql`
    SELECT * FROM admin_users WHERE LOWER(email) = LOWER(${email}) LIMIT 1
  `;
  return rows[0] || null;
}

export async function getAdminUserById(id: number) {
  await ensureAdminUsersTable();
  const { rows } = await sql`SELECT * FROM admin_users WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function getAdminUserCount(): Promise<number> {
  await ensureAdminUsersTable();
  const { rows } = await sql`SELECT COUNT(*)::int AS c FROM admin_users`;
  return rows[0].c;
}

export async function createAdminUser(email: string, passwordHash: string) {
  await ensureAdminUsersTable();
  const { rows } = await sql`
    INSERT INTO admin_users (email, password_hash)
    VALUES (${email.toLowerCase()}, ${passwordHash})
    RETURNING *
  `;
  return rows[0];
}

export async function updateAdminPassword(id: number, passwordHash: string) {
  await ensureAdminUsersTable();
  await sql`
    UPDATE admin_users
    SET password_hash = ${passwordHash},
        reset_token_hash = NULL,
        reset_token_expires_at = NULL,
        updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function updateAdminEmail(id: number, email: string) {
  await ensureAdminUsersTable();
  await sql`
    UPDATE admin_users
    SET email = ${email.toLowerCase()}, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function setAdminResetToken(
  id: number,
  tokenHash: string,
  expiresAt: Date
) {
  await ensureAdminUsersTable();
  await sql`
    UPDATE admin_users
    SET reset_token_hash = ${tokenHash},
        reset_token_expires_at = ${expiresAt.toISOString()},
        updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function clearAdminResetToken(id: number) {
  await ensureAdminUsersTable();
  await sql`
    UPDATE admin_users
    SET reset_token_hash = NULL, reset_token_expires_at = NULL, updated_at = NOW()
    WHERE id = ${id}
  `;
}

// ── Setup: create tables ──
export async function createTables() {
  await ensureAdminUsersTable();
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      title_en TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Automatisation',
      description TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      long_description TEXT NOT NULL DEFAULT '',
      long_description_en TEXT NOT NULL DEFAULT '',
      result TEXT NOT NULL DEFAULT '',
      result_en TEXT NOT NULL DEFAULT '',
      tools TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft',
      image_url TEXT NOT NULL DEFAULT '',
      video_url TEXT NOT NULL DEFAULT '',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Idempotent migrations for existing installs (ADD COLUMN IF NOT EXISTS)
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description_en TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS result_en TEXT NOT NULL DEFAULT ''`;

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      service TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

// ── Projects ──

// Idempotent migration to add bilingual columns on existing installs.
// Uses an in-memory flag so the ALTER TABLE statements only run once per
// serverless instance (subsequent calls are free).
let _projectsBilingualEnsured = false;
async function ensureProjectsBilingual() {
  if (_projectsBilingualEnsured) return;
  try {
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en TEXT NOT NULL DEFAULT ''`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description_en TEXT NOT NULL DEFAULT ''`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS result_en TEXT NOT NULL DEFAULT ''`;
    _projectsBilingualEnsured = true;
  } catch {
    // table doesn't exist yet — createTables() will handle it
  }
}

export async function getProjects() {
  await ensureProjectsBilingual();
  const { rows } = await sql`
    SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC
  `;
  return rows;
}

export async function getPublishedProjects() {
  await ensureProjectsBilingual();
  const { rows } = await sql`
    SELECT * FROM projects WHERE status = 'published' ORDER BY sort_order ASC, created_at DESC
  `;
  return rows;
}

export async function getProjectById(id: number) {
  const { rows } = await sql`SELECT * FROM projects WHERE id = ${id}`;
  return rows[0] || null;
}

export async function createProject(data: {
  title: string;
  title_en?: string;
  category: string;
  description: string;
  description_en?: string;
  long_description: string;
  long_description_en?: string;
  result: string;
  result_en?: string;
  tools: string;
  status: string;
  image_url: string;
  video_url?: string;
  sort_order: number;
}) {
  const { rows } = await sql`
    INSERT INTO projects (
      title, title_en, category,
      description, description_en,
      long_description, long_description_en,
      result, result_en,
      tools, status, image_url, video_url, sort_order
    )
    VALUES (
      ${data.title}, ${data.title_en || ""}, ${data.category},
      ${data.description}, ${data.description_en || ""},
      ${data.long_description}, ${data.long_description_en || ""},
      ${data.result}, ${data.result_en || ""},
      ${data.tools}, ${data.status}, ${data.image_url}, ${data.video_url || ""}, ${data.sort_order}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateProject(
  id: number,
  data: Partial<{
    title: string;
    title_en: string;
    category: string;
    description: string;
    description_en: string;
    long_description: string;
    long_description_en: string;
    result: string;
    result_en: string;
    tools: string;
    status: string;
    image_url: string;
    video_url: string;
    sort_order: number;
  }>
) {
  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (data.title !== undefined) { sets.push(`title = $${idx++}`); values.push(data.title); }
  if (data.title_en !== undefined) { sets.push(`title_en = $${idx++}`); values.push(data.title_en); }
  if (data.category !== undefined) { sets.push(`category = $${idx++}`); values.push(data.category); }
  if (data.description !== undefined) { sets.push(`description = $${idx++}`); values.push(data.description); }
  if (data.description_en !== undefined) { sets.push(`description_en = $${idx++}`); values.push(data.description_en); }
  if (data.long_description !== undefined) { sets.push(`long_description = $${idx++}`); values.push(data.long_description); }
  if (data.long_description_en !== undefined) { sets.push(`long_description_en = $${idx++}`); values.push(data.long_description_en); }
  if (data.result !== undefined) { sets.push(`result = $${idx++}`); values.push(data.result); }
  if (data.result_en !== undefined) { sets.push(`result_en = $${idx++}`); values.push(data.result_en); }
  if (data.tools !== undefined) { sets.push(`tools = $${idx++}`); values.push(data.tools); }
  if (data.status !== undefined) { sets.push(`status = $${idx++}`); values.push(data.status); }
  if (data.image_url !== undefined) { sets.push(`image_url = $${idx++}`); values.push(data.image_url); }
  if (data.video_url !== undefined) { sets.push(`video_url = $${idx++}`); values.push(data.video_url); }
  if (data.sort_order !== undefined) { sets.push(`sort_order = $${idx++}`); values.push(data.sort_order); }

  if (sets.length === 0) return null;

  sets.push(`updated_at = NOW()`);

  const { rows } = await sql.query(
    `UPDATE projects SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    [...values, id]
  );
  return rows[0];
}

export async function deleteProjectById(id: number) {
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

export async function toggleProjectStatus(id: number) {
  const { rows } = await sql`
    UPDATE projects
    SET status = CASE WHEN status = 'published' THEN 'draft' ELSE 'published' END,
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function duplicateProjectById(id: number) {
  const { rows } = await sql`
    INSERT INTO projects (title, category, description, long_description, result, tools, status, image_url, video_url, sort_order)
    SELECT title || ' (copie)', category, description, long_description, result, tools, 'draft', image_url, video_url, sort_order + 1
    FROM projects WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

// ── Messages ──
export async function getMessages() {
  const { rows } = await sql`
    SELECT * FROM messages ORDER BY created_at DESC
  `;
  return rows;
}

export async function getMessageById(id: number) {
  const { rows } = await sql`SELECT * FROM messages WHERE id = ${id}`;
  return rows[0] || null;
}

export async function createMessage(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const { rows } = await sql`
    INSERT INTO messages (name, email, phone, service, message)
    VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service}, ${data.message})
    RETURNING *
  `;
  return rows[0];
}

export async function markMessageRead(id: number) {
  const { rows } = await sql`
    UPDATE messages SET is_read = TRUE WHERE id = ${id} RETURNING *
  `;
  return rows[0];
}

export async function deleteMessageById(id: number) {
  await sql`DELETE FROM messages WHERE id = ${id}`;
}

// ── Stats ──
export async function getStats() {
  const projectStats = await sql`
    SELECT
      COUNT(*)::int AS total_projects,
      COUNT(*) FILTER (WHERE status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::int AS drafts
    FROM projects
  `;
  const messageStats = await sql`
    SELECT
      COUNT(*)::int AS total_messages,
      COUNT(*) FILTER (WHERE is_read = FALSE)::int AS unread,
      COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days')::int AS this_month
    FROM messages
  `;
  const messagesByService = await sql`
    SELECT service, COUNT(*)::int AS count
    FROM messages
    GROUP BY service
    ORDER BY count DESC
  `;
  const messagesByMonth = await sql`
    SELECT
      TO_CHAR(created_at, 'Mon') AS month,
      EXTRACT(MONTH FROM created_at)::int AS month_num,
      COUNT(*)::int AS count
    FROM messages
    WHERE created_at > NOW() - INTERVAL '12 months'
    GROUP BY month, month_num
    ORDER BY month_num
  `;
  const projectsByCategory = await sql`
    SELECT category, COUNT(*)::int AS count
    FROM projects
    GROUP BY category
    ORDER BY count DESC
  `;

  return {
    projects: projectStats.rows[0],
    messages: messageStats.rows[0],
    messagesByService: messagesByService.rows,
    messagesByMonth: messagesByMonth.rows,
    projectsByCategory: projectsByCategory.rows,
  };
}
