import { extraSnippets } from "./snippets-extra";

export interface Snippet {
  slug: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
}

export const snippets: Snippet[] = [
  {
    slug: "fetch-api",
    title: "Fetch API",
    description: "Make an HTTP request and handle JSON responses.",
    language: "JavaScript",
    category: "Web Development",
    code: `async function getUsers() {
  try {
    const response = await fetch('/api/users');

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}`,
  },
  {
    slug: "array-filtering",
    title: "Array Filtering",
    description: "Filter an array based on a condition.",
    language: "JavaScript",
    category: "Fundamentals",
    code: `const activeUsers = users.filter(
  (user) => user.active
);`,
  },
  {
    slug: "php-array-map",
    title: "PHP Array Map",
    description: "Transform each item in a PHP array.",
    language: "PHP",
    category: "Fundamentals",
    code: `$names = array_map(
    fn($user) => $user['name'],
    $users
);`,
  },
  {
    slug: "sql-select",
    title: "SQL Select",
    description: "Query records with a conditional filter.",
    language: "SQL",
    category: "Database",
    code: `SELECT id, name, email
FROM users
WHERE active = 1
ORDER BY name ASC;`,
  },
  {
    slug: "git-undo-changes",
    title: "Git Undo Changes",
    description: "Discard unstaged changes in a file.",
    language: "Bash",
    category: "Developer Tools",
    code: `git diff
git restore path/to/file`,
  },
  {
    slug: "css-centering",
    title: "CSS Centering",
    description: "Center content horizontally and vertically.",
    language: "CSS",
    category: "Web Development",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
  },
    {
      slug: "javascript-debounce",
      title: "Debounce an Input Handler",
      description: "Delay work until input settles, useful for search and resize handlers.",
      language: "JavaScript",
      category: "Performance",
      code: `function debounce(callback, delay = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
}

const search = debounce((event) => {
    console.log("Search for:", event.target.value);
});`,
    },
    {
      slug: "javascript-throttle",
      title: "Throttle an Event Handler",
      description: "Limit a frequently triggered callback to one execution per interval.",
      language: "JavaScript",
      category: "Performance",
      code: `function throttle(callback, interval = 200) {
    let lastRun = 0;

    return (...args) => {
      const now = Date.now();
      if (now - lastRun < interval) return;

      lastRun = now;
      callback(...args);
    };
}

window.addEventListener("scroll", throttle(() => {
    console.log(window.scrollY);
}));`,
    },
    {
      slug: "javascript-fetch-with-timeout",
      title: "Fetch with a Timeout",
      description: "Cancel a slow HTTP request using AbortController.",
      language: "JavaScript",
      category: "Networking",
      code: `async function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(\`Request failed: \${response.status}\`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
}`,
    },
    {
      slug: "javascript-retry-backoff",
      title: "Retry with Exponential Backoff",
      description: "Retry transient failures with bounded exponential delays.",
      language: "JavaScript",
      category: "Networking",
      code: `async function retry(operation, attempts = 3) {
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === attempts - 1) throw error;

        const delay = 250 * 2 ** attempt;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error("Retry attempts exhausted");
}`,
    },
    {
      slug: "javascript-group-by-key",
      title: "Group Records by Key",
      description: "Build a lookup of records grouped by a selected property.",
      language: "JavaScript",
      category: "Data Transformation",
      code: `function groupBy(items, getKey) {
    return items.reduce((groups, item) => {
      const key = getKey(item);
      (groups[key] ??= []).push(item);
      return groups;
    }, Object.create(null));
}

const usersByRole = groupBy(users, (user) => user.role);`,
    },
    {
      slug: "javascript-unique-by",
      title: "Deduplicate by Property",
      description: "Keep the first item for each unique value returned by a selector.",
      language: "JavaScript",
      category: "Data Transformation",
      code: `function uniqueBy(items, getKey) {
    const seen = new Set();

    return items.filter((item) => {
      const key = getKey(item);
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
}

const uniqueUsers = uniqueBy(users, (user) => user.id);`,
    },
    {
      slug: "javascript-safe-local-storage",
      title: "Read JSON from Local Storage",
      description: "Handle missing or malformed browser storage without hiding unrelated errors.",
      language: "JavaScript",
      category: "Browser APIs",
      code: `function readStoredJson(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn(\`Invalid stored JSON for "\${key}"\`, error);
      return fallback;
    }
}

const preferences = readStoredJson("preferences", {});`,
    },
    {
      slug: "javascript-format-currency",
      title: "Format Currency with Intl",
      description: "Format numeric currency values with locale-aware separators and symbols.",
      language: "JavaScript",
      category: "Internationalization",
      code: `const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

currency.format(1299.5); // "$1,299.50"`,
    },
    {
      slug: "javascript-concurrent-map",
      title: "Run Tasks with a Concurrency Limit",
      description: "Process a collection without starting every asynchronous task at once.",
      language: "JavaScript",
      category: "Asynchronous",
      code: `async function mapWithConcurrency(items, limit, mapper) {
    if (!Number.isInteger(limit) || limit < 1) {
      throw new RangeError("limit must be a positive integer");
    }

    const results = new Array(items.length);
    let nextIndex = 0;

    async function worker() {
      while (nextIndex < items.length) {
        const index = nextIndex++;
        results[index] = await mapper(items[index], index);
      }
    }

    await Promise.all(
      Array.from({ length: Math.min(limit, items.length) }, worker),
    );
    return results;
}`,
    },
    {
      slug: "javascript-copy-to-clipboard",
      title: "Copy Text to Clipboard",
      description: "Use the secure-context Clipboard API and surface failures to the caller.",
      language: "JavaScript",
      category: "Browser APIs",
      code: `async function copyText(text) {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard access is unavailable");
    }

    await navigator.clipboard.writeText(text);
}

copyText("Copied text").catch((error) => {
    console.error("Could not copy text:", error);
});`,
    },
    {
      slug: "php-pdo-prepared-query",
      title: "PDO Prepared Query",
      description: "Bind user-provided values instead of interpolating them into SQL.",
      language: "PHP",
      category: "Database",
      code: `$statement = $pdo->prepare(
      'SELECT id, name, email
       FROM users
       WHERE email = :email'
);

$statement->execute([
      'email' => $email,
]);

$user = $statement->fetch(PDO::FETCH_ASSOC);`,
    },
    {
      slug: "php-password-hashing",
      title: "Hash and Verify Passwords",
      description: "Use PHP's password API instead of storing plaintext or reversible passwords.",
      language: "PHP",
      category: "Security",
      code: `$hash = password_hash($password, PASSWORD_DEFAULT);

if ($hash === false) {
      throw new RuntimeException('Password hashing failed.');
}

// Store $hash, never the original password.
if (password_verify($submittedPassword, $hash)) {
      echo 'Credentials accepted';
}`,
    },
    {
      slug: "php-json-response",
      title: "Return a JSON Response",
      description: "Set the response content type and encode data with exceptions enabled.",
      language: "PHP",
      category: "Web Development",
      code: `function jsonResponse(array $payload, int $status = 200): never
{
      http_response_code($status);
      header('Content-Type: application/json; charset=utf-8');

      echo json_encode(
          $payload,
          JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES
      );
      exit;
}

jsonResponse(['ok' => true]);`,
    },
    {
      slug: "php-validate-request",
      title: "Validate a Request Payload",
      description: "Validate required fields and normalize values before application logic.",
      language: "PHP",
      category: "Validation",
      code: `$email = filter_var(
      trim((string) ($input['email'] ?? '')),
      FILTER_VALIDATE_EMAIL
);

$name = trim((string) ($input['name'] ?? ''));

if ($email === false || $name === '') {
      http_response_code(422);
      throw new InvalidArgumentException('A valid email and name are required.');
}`,
    },
    {
      slug: "php-csrf-token",
      title: "Session CSRF Token",
      description: "Generate and verify a session-bound token for state-changing forms.",
      language: "PHP",
      category: "Security",
      code: `session_start();

if (empty($_SESSION['csrf_token'])) {
      $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$submitted = $_POST['csrf_token'] ?? '';
$expected = $_SESSION['csrf_token'];

if (!is_string($submitted) || !hash_equals($expected, $submitted)) {
      http_response_code(403);
      exit('Invalid CSRF token');
}`,
    },
    {
      slug: "php-safe-pagination",
      title: "Validate Pagination Parameters",
      description: "Bound page size and normalize the page number before querying.",
      language: "PHP",
      category: "Web Development",
      code: `$page = filter_input(
      INPUT_GET,
      'page',
      FILTER_VALIDATE_INT,
      ['options' => ['min_range' => 1]]
) ?: 1;

$perPage = filter_input(
      INPUT_GET,
      'per_page',
      FILTER_VALIDATE_INT,
      ['options' => ['min_range' => 1, 'max_range' => 100]]
) ?: 20;

$offset = ($page - 1) * $perPage;`,
    },
    {
      slug: "php-upload-validation",
      title: "Validate an Uploaded File",
      description: "Check upload status, size, and detected MIME type before moving a file.",
      language: "PHP",
      category: "Security",
      code: `$file = $_FILES['document'] ?? null;
$allowedTypes = ['application/pdf'];
$maxBytes = 5 * 1024 * 1024;

if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
      throw new RuntimeException('Upload failed.');
}

if ($file['size'] > $maxBytes) {
      throw new RuntimeException('File is too large.');
}

$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!in_array($mime, $allowedTypes, true)) {
      throw new RuntimeException('Unsupported file type.');
}`,
    },
    {
      slug: "php-array-partition",
      title: "Partition an Array",
      description: "Split records into matching and non-matching groups with one pass.",
      language: "PHP",
      category: "Data Transformation",
      code: `function partition(array $items, callable $predicate): array
{
      $matching = [];
      $remaining = [];

      foreach ($items as $item) {
          if ($predicate($item)) {
              $matching[] = $item;
          } else {
              $remaining[] = $item;
          }
      }

      return [$matching, $remaining];
}

[$active, $inactive] = partition($users, fn ($user) => $user['active']);`,
    },
    {
      slug: "php-safe-output",
      title: "Escape HTML Output",
      description: "Encode untrusted text before placing it inside an HTML document.",
      language: "PHP",
      category: "Security",
      code: `function escapeHtml(string $value): string
{
      return htmlspecialchars(
          $value,
          ENT_QUOTES | ENT_SUBSTITUTE,
          'UTF-8'
      );
}

echo '<p>' . escapeHtml($userProvidedName) . '</p>';`,
    },
    {
      slug: "php-transaction",
      title: "PDO Transaction with Rollback",
      description: "Keep related database writes atomic and roll back when an operation fails.",
      language: "PHP",
      category: "Database",
      code: `try {
      $pdo->beginTransaction();

      $debit->execute(['amount' => $amount, 'account' => $from]);
      $credit->execute(['amount' => $amount, 'account' => $to]);

      $pdo->commit();
} catch (Throwable $error) {
      if ($pdo->inTransaction()) {
          $pdo->rollBack();
      }

      throw $error;
}`,
    },
    {
      slug: "php-env-config",
      title: "Read Required Environment Variables",
      description: "Fail clearly when required runtime configuration is missing.",
      language: "PHP",
      category: "Configuration",
      code: `function requiredEnv(string $name): string
{
      $value = getenv($name);

      if ($value === false || $value === '') {
          throw new RuntimeException(
              sprintf('Required environment variable "%s" is missing.', $name)
          );
      }

      return $value;
}

$databaseUrl = requiredEnv('DATABASE_URL');`,
    },
    {
      slug: "css-responsive-grid",
      title: "Auto-Fit Responsive Grid",
      description: "Create a grid that adapts its column count without breakpoint-specific rules.",
      language: "CSS",
      category: "Layout",
      code: `.card-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, 16rem), 1fr)
    );
    gap: clamp(1rem, 3vw, 1.5rem);
}`,
    },
    {
      slug: "css-fluid-type",
      title: "Fluid Responsive Typography",
      description: "Scale heading text smoothly between compact and wide viewports.",
      language: "CSS",
      category: "Typography",
      code: `.page-title {
    font-size: clamp(2rem, 1.2rem + 3.5vw, 4.5rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
}`,
    },
    {
      slug: "css-accessible-focus",
      title: "Accessible Keyboard Focus",
      description: "Keep a visible focus indicator for keyboard users without changing pointer styles.",
      language: "CSS",
      category: "Accessibility",
      code: `:where(a, button, input, select, textarea):focus-visible {
    outline: 3px solid #7c3aed;
    outline-offset: 3px;
}

:where(a, button, input, select, textarea):focus:not(:focus-visible) {
    outline: none;
}`,
    },
    {
      slug: "css-reduced-motion",
      title: "Respect Reduced Motion Preferences",
      description: "Disable non-essential transitions and animations when requested by the user.",
      language: "CSS",
      category: "Accessibility",
      code: `@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
}`,
    },
    {
      slug: "css-container-query",
      title: "Container Query Component",
      description: "Adapt a component to its available container width instead of viewport width.",
      language: "CSS",
      category: "Responsive Design",
      code: `.panel {
    container-type: inline-size;
}

.panel-content {
    display: grid;
    gap: 1rem;
}

@container (min-width: 36rem) {
    .panel-content {
      grid-template-columns: 12rem 1fr;
      align-items: center;
    }
}`,
    },
    {
      slug: "css-sticky-header",
      title: "Sticky Header with Layering",
      description: "Keep a page header visible while scrolling and above page content.",
      language: "CSS",
      category: "Layout",
      code: `.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgb(16 17 16 / 92%);
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    backdrop-filter: blur(12px);
}`,
    },
    {
      slug: "css-truncate-text",
      title: "Truncate Text with an Ellipsis",
      description: "Prevent long single-line labels from breaking compact layouts.",
      language: "CSS",
      category: "Typography",
      code: `.truncate {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}`,
    },
    {
      slug: "css-responsive-image",
      title: "Responsive Image with Aspect Ratio",
      description: "Keep image dimensions stable while the image scales to its container.",
      language: "CSS",
      category: "Media",
      code: `.cover-image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 0.75rem;
}`,
    },
    {
      slug: "css-scroll-snap",
      title: "Horizontal Scroll Snap",
      description: "Build a touch-friendly horizontal carousel using native scrolling.",
      language: "CSS",
      category: "Interaction",
      code: `.carousel {
    display: grid;
    grid-auto-columns: minmax(80%, 22rem);
    grid-auto-flow: column;
    gap: 1rem;
    overflow-x: auto;
    padding: 0.5rem;
    scroll-snap-type: x mandatory;
}

.carousel > * {
    scroll-snap-align: start;
}`,
    },
    {
      slug: "css-design-tokens",
      title: "Reusable Design Tokens",
      description: "Centralize common colors, spacing, and radii for a consistent interface.",
      language: "CSS",
      category: "Design Systems",
      code: `:root {
    --color-surface: #171917;
    --color-text: #e7e9e5;
    --color-accent: #c5f467;
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --radius-card: 0.75rem;
}

.card {
    padding: var(--space-3);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    color: var(--color-text);
}`,
    },
    {
      slug: "sql-keyset-pagination",
      title: "Keyset Pagination",
      description: "Fetch the next page using a stable cursor for large ordered datasets.",
      language: "SQL",
      category: "Performance",
      code: `-- PostgreSQL: pass the last seen created_at and id as cursor values.
SELECT id, title, created_at
FROM articles
WHERE (created_at, id) < (:cursor_created_at, :cursor_id)
ORDER BY created_at DESC, id DESC
LIMIT :page_size;`,
    },
    {
      slug: "sql-conditional-aggregation",
      title: "Conditional Aggregation",
      description: "Count multiple statuses in one grouped query using CASE expressions.",
      language: "SQL",
      category: "Reporting",
      code: `SELECT
      account_id,
      COUNT(*) AS total_orders,
      SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_orders,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders
FROM orders
GROUP BY account_id
ORDER BY total_orders DESC;`,
    },
    {
      slug: "sql-upsert-postgres",
      title: "PostgreSQL Upsert",
      description: "Insert a row or update selected fields when a unique key already exists.",
      language: "SQL",
      category: "PostgreSQL",
      code: `INSERT INTO user_preferences (user_id, theme, updated_at)
VALUES (:user_id, :theme, CURRENT_TIMESTAMP)
ON CONFLICT (user_id)
DO UPDATE SET
      theme = EXCLUDED.theme,
      updated_at = EXCLUDED.updated_at
RETURNING user_id, theme, updated_at;`,
    },
    {
      slug: "sql-transaction",
      title: "Atomic Database Transaction",
      description: "Commit related updates together or roll back the whole transaction.",
      language: "SQL",
      category: "Transactions",
      code: `BEGIN;

UPDATE accounts
SET balance = balance - :amount
WHERE id = :from_id AND balance >= :amount;

UPDATE accounts
SET balance = balance + :amount
WHERE id = :to_id;

COMMIT;`,
    },
    {
      slug: "sql-window-ranking",
      title: "Rank Rows Within Groups",
      description: "Use a window function to rank records without collapsing the result rows.",
      language: "SQL",
      category: "Analytics",
      code: `SELECT
      department_id,
      employee_id,
      salary,
      DENSE_RANK() OVER (
          PARTITION BY department_id
          ORDER BY salary DESC
      ) AS salary_rank
FROM employees;`,
    },
    {
      slug: "sql-cte-monthly-summary",
      title: "Monthly Revenue Summary",
      description: "Use a common table expression to make an aggregate query easier to read.",
      language: "SQL",
      category: "Reporting",
      code: `WITH monthly_sales AS (
      SELECT
          DATE_TRUNC('month', created_at) AS month,
          SUM(total_amount) AS revenue
      FROM orders
      WHERE status = 'paid'
      GROUP BY DATE_TRUNC('month', created_at)
)
SELECT month, revenue
FROM monthly_sales
ORDER BY month DESC;`,
    },
    {
      slug: "sql-find-missing-relations",
      title: "Find Records Without a Relation",
      description: "Use NOT EXISTS to find parent records without matching child rows.",
      language: "SQL",
      category: "Data Quality",
      code: `SELECT customers.id, customers.email
FROM customers
WHERE NOT EXISTS (
      SELECT 1
      FROM orders
      WHERE orders.customer_id = customers.id
);`,
    },
    {
      slug: "sql-safe-delete-preview",
      title: "Preview Rows Before Deleting",
      description: "Inspect the exact target set inside a transaction before committing a delete.",
      language: "SQL",
      category: "Data Safety",
      code: `BEGIN;

SELECT id, email, created_at
FROM users
WHERE last_login_at < :cutoff_date;

DELETE FROM users
WHERE last_login_at < :cutoff_date;

-- Verify the affected row count, then COMMIT or ROLLBACK.`,
    },
    {
      slug: "sql-create-index",
      title: "Index a Frequently Filtered Column",
      description: "Add an index for a common lookup and verify its impact with the query planner.",
      language: "SQL",
      category: "Performance",
      code: `CREATE INDEX idx_orders_customer_created
ON orders (customer_id, created_at DESC);

-- PostgreSQL: inspect whether the planner uses the index.
EXPLAIN ANALYZE
SELECT id, created_at, total_amount
FROM orders
WHERE customer_id = :customer_id
ORDER BY created_at DESC
LIMIT 20;`,
    },
    {
      slug: "sql-duplicate-records",
      title: "Find Duplicate Values",
      description: "Identify duplicate email addresses before applying a uniqueness constraint.",
      language: "SQL",
      category: "Data Quality",
      code: `SELECT
      LOWER(TRIM(email)) AS normalized_email,
      COUNT(*) AS duplicate_count
FROM users
GROUP BY LOWER(TRIM(email))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;`,
    },
    {
      slug: "bash-strict-mode",
      title: "Bash Strict Mode",
      description: "Fail on command errors, unset variables, and pipeline failures in scripts.",
      language: "Bash",
      category: "Scripting",
      code: `#!/usr/bin/env bash
set -Eeuo pipefail

main() {
    printf 'Running safely from %s\\n' "$PWD"
}

main "$@"`,
    },
    {
      slug: "bash-required-env",
      title: "Require Environment Variables",
      description: "Stop early with a clear message when runtime configuration is absent.",
      language: "Bash",
      category: "Configuration",
      code: `: "\${DATABASE_URL:?DATABASE_URL must be set}"
: "\${API_TOKEN:?API_TOKEN must be set}"

printf 'Configuration is available.\\n'`,
    },
    {
      slug: "bash-temp-directory-cleanup",
      title: "Temporary Directory with Cleanup",
      description: "Create a private temporary workspace and remove it on exit.",
      language: "Bash",
      category: "Scripting",
      code: `#!/usr/bin/env bash
set -Eeuo pipefail

tmp_dir="$(mktemp -d)"
cleanup() {
    rm -rf -- "$tmp_dir"
}
trap cleanup EXIT

printf 'Working in %s\\n' "$tmp_dir"`,
    },
    {
      slug: "bash-safe-file-loop",
      title: "Process Filenames Safely",
      description: "Handle spaces and newlines in filenames with null-delimited find output.",
      language: "Bash",
      category: "Files",
      code: `find ./uploads -type f -name '*.log' -print0 |
    while IFS= read -r -d '' file; do
      printf 'Found: %s\\n' "$file"
      wc -l < "$file"
    done`,
    },
    {
      slug: "bash-curl-retry",
      title: "Download with curl Retries",
      description: "Retry transient HTTP failures and fail on unsuccessful responses.",
      language: "Bash",
      category: "Networking",
      code: `curl \\
  --fail \\
  --location \\
  --retry 3 \\
  --retry-delay 1 \\
  --retry-all-errors \\
  --connect-timeout 10 \\
  --output ./artifact.tar.gz \\
  "$ARTIFACT_URL"`,
    },
    {
      slug: "bash-check-dependencies",
      title: "Check Required Commands",
      description: "Validate external tools before starting a script.",
      language: "Bash",
      category: "Scripting",
      code: `required_commands=(git node npm)

for command_name in "\${required_commands[@]}"; do
    if ! command -v "$command_name" >/dev/null 2>&1; then
      printf 'Missing required command: %s\\n' "$command_name" >&2
      exit 1
    fi
done`,
    },
    {
      slug: "bash-archive-folder",
      title: "Create a Compressed Archive",
      description: "Archive a directory while preserving its structure and reporting failures.",
      language: "Bash",
      category: "Files",
      code: `#!/usr/bin/env bash
set -Eeuo pipefail

source_dir="\${1:?Usage: archive.sh <directory>}"
archive_name="\${2:-backup.tar.gz}"

tar -czf "$archive_name" -C "$(dirname "$source_dir")" "$(basename "$source_dir")"
printf 'Created %s\\n' "$archive_name"`,
    },
    {
      slug: "bash-git-changed-files",
      title: "List Changed Git Files",
      description: "Show tracked and untracked changes in a concise, script-friendly format.",
      language: "Bash",
      category: "Git",
      code: `git status --short

# List paths changed from the current branch's upstream.
git diff --name-only '@{upstream}...HEAD'

# Include staged and unstaged changes.
git diff --name-only HEAD`,
    },
    {
      slug: "bash-checksum-file",
      title: "Verify a SHA-256 Checksum",
      description: "Compare a downloaded file against a trusted SHA-256 checksum.",
      language: "Bash",
      category: "Security",
      code: `expected_sha256="\${EXPECTED_SHA256:?Set EXPECTED_SHA256}"
file="\${1:?Usage: verify.sh <file>}"

printf '%s  %s\\n' "$expected_sha256" "$file" | sha256sum --check --status
printf 'Checksum verified: %s\\n' "$file"`,
    },
  {
    slug: "typescript-discriminated-union",
    title: "Model API Results with a Discriminated Union",
    description: "Represent success and failure states explicitly so TypeScript can narrow safely.",
    language: "TypeScript",
    category: "Type Safety",
    code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

function unwrap<T>(result: Result<T>): T {
  if (!result.ok) throw result.error;
  return result.value;
}

const result: Result<number> = { ok: true, value: 42 };`,
  },
  {
    slug: "typescript-exhaustive-switch",
    title: "Exhaustive Union Checks",
    description: "Make the compiler report when a new union case is not handled.",
    language: "TypeScript",
    category: "Type Safety",
    code: `type Status = "idle" | "loading" | "success" | "error";

function assertNever(value: never): never {
  throw new Error(\`Unhandled value: \${value}\`);
}

function label(status: Status): string {
  switch (status) {
    case "idle": return "Ready";
    case "loading": return "Loading";
    case "success": return "Complete";
    case "error": return "Failed";
    default: return assertNever(status);
  }
}`,
  },
  {
    slug: "typescript-safe-record",
    title: "Type-Safe Lookup Table",
    description: "Use a Record to ensure every key in a union has a corresponding value.",
    language: "TypeScript",
    category: "Type Safety",
    code: `type Role = "admin" | "editor" | "viewer";

const roleLabel: Record<Role, string> = {
  admin: "Administrator",
  editor: "Editor",
  viewer: "Read only",
};

function getRoleLabel(role: Role): string {
  return roleLabel[role];
}`,
  },
  {
    slug: "python-dataclass",
    title: "Immutable Data Class",
    description: "Define a compact typed value object with generated comparison and representation.",
    language: "Python",
    category: "Data Modeling",
    code: `from dataclasses import dataclass


@dataclass(frozen=True)
class User:
    id: int
    email: str
    is_active: bool = True


user = User(id=1, email="dev@example.com")`,
  },
  {
    slug: "python-retry-context",
    title: "Retry a Transient Operation",
    description: "Retry a narrowly scoped operation with bounded exponential backoff.",
    language: "Python",
    category: "Resilience",
    code: `import time
from collections.abc import Callable
from typing import TypeVar

T = TypeVar("T")


def retry(operation: Callable[[], T], attempts: int = 3) -> T:
    for attempt in range(attempts):
        try:
            return operation()
        except TimeoutError:
            if attempt == attempts - 1:
                raise
            time.sleep(0.25 * (2**attempt))

    raise RuntimeError("Retry attempts exhausted")`,
  },
  {
    slug: "python-json-file",
    title: "Read and Write JSON Files",
    description: "Use pathlib and UTF-8 explicitly when persisting JSON data.",
    language: "Python",
    category: "Files",
    code: `import json
from pathlib import Path

path = Path("settings.json")
settings = {"theme": "dark", "compact": True}

path.write_text(
    json.dumps(settings, indent=2) + "\\n",
    encoding="utf-8",
)

loaded = json.loads(path.read_text(encoding="utf-8"))`,
  },
  {
    slug: "java-record-validation",
    title: "Validated Immutable Record",
    description: "Use a Java record for concise immutable data with constructor validation.",
    language: "Java",
    category: "Data Modeling",
    code: `import java.util.Objects;

public record User(String email, String displayName) {
    public User {
        Objects.requireNonNull(email, "email is required");
        Objects.requireNonNull(displayName, "displayName is required");

        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}`,
  },
  {
    slug: "java-http-client",
    title: "Send an HTTP Request",
    description: "Use the standard Java HTTP client and handle non-success responses.",
    language: "Java",
    category: "Networking",
    code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/health"))
    .GET()
    .build();

var response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() / 100 != 2) {
    throw new IllegalStateException("Request failed: " + response.statusCode());
}`,
  },
  {
    slug: "java-stream-grouping",
    title: "Group Objects with Streams",
    description: "Collect objects into groups keyed by a selected property.",
    language: "Java",
    category: "Data Transformation",
    code: `import java.util.Map;
import java.util.stream.Collectors;

Map<String, java.util.List<User>> usersByRole = users.stream()
    .collect(Collectors.groupingBy(User::role));

usersByRole.forEach((role, members) ->
    System.out.println(role + ": " + members.size())
);`,
  },
  {
    slug: "c-safe-string-format",
    title: "Format Strings with Bounds Checking",
    description: "Use snprintf and check its return value to avoid writing past a buffer.",
    language: "C",
    category: "Safety",
    code: `#include <stdio.h>
#include <stddef.h>

int format_user(char *buffer, size_t capacity, const char *name) {
    int written = snprintf(buffer, capacity, "Hello, %s", name);

    if (written < 0 || (size_t)written >= capacity) {
        return -1;
    }

    return written;
}`,
  },
  {
    slug: "c-file-read",
    title: "Read a File Line by Line",
    description: "Use getline to handle variable-length lines and release allocated memory.",
    language: "C",
    category: "Files",
    code: `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE *file = fopen("input.txt", "r");
    if (file == NULL) return EXIT_FAILURE;

    char *line = NULL;
    size_t capacity = 0;
    ssize_t length;

    while ((length = getline(&line, &capacity, file)) != -1) {
        fwrite(line, 1, (size_t)length, stdout);
    }

    free(line);
    fclose(file);
    return EXIT_SUCCESS;
}`,
  },
  {
    slug: "c-cleanup-resources",
    title: "Centralized C Resource Cleanup",
    description: "Use a single cleanup path to release resources after partial failures.",
    language: "C",
    category: "Safety",
    code: `int process_file(const char *path) {
    FILE *file = NULL;
    char *buffer = NULL;
    int result = -1;

    file = fopen(path, "rb");
    if (file == NULL) goto cleanup;

    buffer = malloc(4096);
    if (buffer == NULL) goto cleanup;

    result = fread(buffer, 1, 4096, file) >= 0 ? 0 : -1;

cleanup:
    free(buffer);
    if (file != NULL) fclose(file);
    return result;
}`,
  },
  {
    slug: "cpp-raii-file",
    title: "Manage Files with RAII",
    description: "Let C++ resource ownership close a file automatically on every exit path.",
    language: "C++",
    category: "Resource Management",
    code: `#include <fstream>
#include <stdexcept>
#include <string>

std::string readFile(const std::string& path) {
    std::ifstream file(path);
    if (!file) {
        throw std::runtime_error("Could not open file");
    }

    return {std::istreambuf_iterator<char>(file),
            std::istreambuf_iterator<char>()};
}`,
  },
  {
    slug: "cpp-optional-value",
    title: "Return Optional Values",
    description: "Use std::optional to represent a value that may not exist.",
    language: "C++",
    category: "Type Safety",
    code: `#include <optional>
#include <string>
#include <vector>

std::optional<std::string> findUser(
    const std::vector<std::string>& users,
    const std::string& email
) {
    for (const auto& user : users) {
        if (user == email) return user;
    }
    return std::nullopt;
}`,
  },
  {
    slug: "cpp-transform-vector",
    title: "Transform a Collection",
    description: "Use the standard algorithm library to transform values into a new vector.",
    language: "C++",
    category: "Data Transformation",
    code: `#include <algorithm>
#include <vector>

std::vector<int> squared(const std::vector<int>& values) {
    std::vector<int> result;
    result.reserve(values.size());

    std::transform(values.begin(), values.end(),
                   std::back_inserter(result),
                   [](int value) { return value * value; });
    return result;
}`,
  },
  {
    slug: "csharp-result-type",
    title: "Represent Operation Results",
    description: "Return a typed success or failure instead of using null as an error signal.",
    language: "C#",
    category: "Type Safety",
    code: `public sealed record Result<T>(
    T? Value,
    string? Error)
{
    public bool IsSuccess => Error is null;

    public static Result<T> Success(T value) => new(value, null);
    public static Result<T> Failure(string error) => new(default, error);
}

var result = Result<int>.Success(42);`,
  },
  {
    slug: "csharp-async-http",
    title: "Call an HTTP API Asynchronously",
    description: "Reuse HttpClient and ensure unsuccessful status codes are surfaced.",
    language: "C#",
    category: "Networking",
    code: `using System.Net.Http.Json;

static async Task<User?> GetUserAsync(
    HttpClient client,
    int id,
    CancellationToken cancellationToken)
{
    using var response = await client.GetAsync(
        $"api/users/{id}",
        cancellationToken);

    response.EnsureSuccessStatusCode();
    return await response.Content.ReadFromJsonAsync<User>(
        cancellationToken);
}`,
  },
  {
    slug: "csharp-dictionary-count",
    title: "Count Values with a Dictionary",
    description: "Aggregate values in one pass using TryGetValue rather than repeated scans.",
    language: "C#",
    category: "Data Transformation",
    code: `var counts = new Dictionary<string, int>();

foreach (var tag in tags)
{
    counts.TryGetValue(tag, out var currentCount);
    counts[tag] = currentCount + 1;
}

foreach (var (tag, count) in counts)
{
    Console.WriteLine($"{tag}: {count}");
}`,
  },
  {
    slug: "go-http-server",
    title: "Minimal HTTP Handler",
    description: "Register a typed Go HTTP handler and return a clear JSON response.",
    language: "Go",
    category: "Web Development",
    code: `package main

import (
	"encoding/json"
	"net/http"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func main() {
	http.HandleFunc("GET /health", healthHandler)
	_ = http.ListenAndServe(":8080", nil)
}`,
  },
  {
    slug: "go-error-wrapping",
    title: "Wrap Errors with Context",
    description: "Preserve the original Go error while adding useful operation context.",
    language: "Go",
    category: "Error Handling",
    code: `package store

import (
	"fmt"
	"os"
)

func loadConfig(path string) ([]byte, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("load config %q: %w", path, err)
	}
	return data, nil
}`,
  },
  {
    slug: "go-worker-pool",
    title: "Bounded Worker Pool",
    description: "Process jobs concurrently with a fixed number of workers.",
    language: "Go",
    category: "Concurrency",
    code: `func processJobs(jobs []Job, workerCount int) {
	queue := make(chan Job)
	var workers sync.WaitGroup

	for range workerCount {
		workers.Add(1)
		go func() {
			defer workers.Done()
			for job := range queue {
				process(job)
			}
		}()
	}

	for _, job := range jobs {
		queue <- job
	}
	close(queue)
	workers.Wait()
}`,
  },
  {
    slug: "rust-result-propagation",
    title: "Propagate Errors with Result",
    description: "Use the question-mark operator to return errors without losing context.",
    language: "Rust",
    category: "Error Handling",
    code: `use std::{fs, io, path::Path};

fn read_config(path: &Path) -> Result<String, io::Error> {
    let contents = fs::read_to_string(path)?;
    Ok(contents)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = read_config(Path::new("app.toml"))?;
    println!("{config}");
    Ok(())
}`,
  },
  {
    slug: "rust-option-map",
    title: "Transform an Optional Value",
    description: "Use Option combinators to transform a value only when it exists.",
    language: "Rust",
    category: "Type Safety",
    code: `fn display_name(name: Option<&str>) -> String {
    name
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(str::to_owned)
        .unwrap_or_else(|| "Anonymous".to_string())
}

assert_eq!(display_name(Some(" Ada ")), "Ada");`,
  },
  {
    slug: "rust-collect-results",
    title: "Collect Results and Stop on Error",
    description: "Collect an iterator of Results into one Result containing all values.",
    language: "Rust",
    category: "Iterators",
    code: `fn parse_ids(values: &[&str]) -> Result<Vec<u64>, std::num::ParseIntError> {
    values
        .iter()
        .map(|value| value.parse::<u64>())
        .collect()
}

let ids = parse_ids(&["12", "34", "56"])?;`,
  },
  {
    slug: "ruby-safe-hash-access",
    title: "Fetch Hash Values Safely",
    description: "Use fetch to distinguish missing keys and provide explicit defaults.",
    language: "Ruby",
    category: "Data Handling",
    code: `settings = { theme: "dark" }

theme = settings.fetch(:theme, "light")
locale = settings.fetch(:locale) do
  ENV.fetch("APP_LOCALE", "en")
end

puts "#{theme} / #{locale}"`,
  },
  {
    slug: "ruby-enumerable-transform",
    title: "Transform and Index Records",
    description: "Compose Enumerable methods to build a filtered lookup from records.",
    language: "Ruby",
    category: "Data Transformation",
    code: `active_users_by_email = users
  .select(&:active?)
  .to_h { |user| [user.email.downcase, user] }

user = active_users_by_email["dev@example.com"]`,
  },
  {
    slug: "ruby-json-api",
    title: "Build a JSON Response",
    description: "Serialize a Ruby hash as JSON and set an explicit response content type.",
    language: "Ruby",
    category: "Web Development",
    code: `require "json"

payload = {
  status: "ok",
  data: { version: 1 }
}

response_body = JSON.generate(payload)
response_headers = {
  "content-type" => "application/json; charset=utf-8"
}`,
  },
  {
    slug: "swift-async-request",
    title: "Fetch JSON with async/await",
    description: "Use URLSession concurrency APIs and validate the HTTP response.",
    language: "Swift",
    category: "Networking",
    code: `struct User: Decodable {
    let id: Int
    let name: String
}

func fetchUser(from url: URL) async throws -> User {
    let (data, response) = try await URLSession.shared.data(from: url)

    guard let http = response as? HTTPURLResponse,
          (200..<300).contains(http.statusCode) else {
        throw URLError(.badServerResponse)
    }

    return try JSONDecoder().decode(User.self, from: data)
}`,
  },
  {
    slug: "swift-safe-dictionary",
    title: "Safely Read a Dictionary Value",
    description: "Use optional binding and a meaningful fallback for dictionary lookups.",
    language: "Swift",
    category: "Type Safety",
    code: `let scores = ["Ada": 98, "Linus": 95]

if let score = scores["Ada"] {
    print("Score: \\(score)")
} else {
    print("No score available")
}

let fallbackScore = scores["Grace", default: 0]`,
  },
  {
    slug: "swift-grouping",
    title: "Group Values by a Property",
    description: "Create a dictionary of arrays using Dictionary's grouping initializer.",
    language: "Swift",
    category: "Data Transformation",
    code: `struct Event {
    let day: String
    let title: String
}

let eventsByDay = Dictionary(grouping: events, by: \\.day)
let mondayEvents = eventsByDay["Monday", default: []]`,
  },
  {
    slug: "kotlin-result-model",
    title: "Model a Sealed Result",
    description: "Use a sealed interface to represent success and failure explicitly.",
    language: "Kotlin",
    category: "Type Safety",
    code: `sealed interface Result<out T> {
    data class Success<T>(val value: T) : Result<T>
    data class Failure(val cause: Throwable) : Result<Nothing>
}

fun render(result: Result<String>): String = when (result) {
    is Result.Success -> result.value
    is Result.Failure -> "Error: \${result.cause.message}"
}`,
  },
  {
    slug: "kotlin-safe-http",
    title: "Handle Nullable Values",
    description: "Combine safe calls, let, and Elvis to handle absent data clearly.",
    language: "Kotlin",
    category: "Type Safety",
    code: `data class Profile(val name: String?)

fun greeting(profile: Profile?): String {
    val name = profile?.name
        ?.trim()
        ?.takeIf { it.isNotEmpty() }
        ?: "there"

    return "Hello, $name!"
}`,
  },
  {
    slug: "kotlin-grouping",
    title: "Group Items by a Property",
    description: "Build a map of lists using the standard groupingBy and groupBy operations.",
    language: "Kotlin",
    category: "Data Transformation",
    code: `data class Task(val project: String, val title: String)

val tasksByProject: Map<String, List<Task>> =
    tasks.groupBy(Task::project)

tasksByProject.forEach { (project, projectTasks) ->
    println("$project: \${projectTasks.size} tasks")
}`,
  },
  {
    slug: "dart-json-model",
    title: "Parse JSON into a Dart Model",
    description: "Validate loosely typed JSON fields while constructing a typed model.",
    language: "Dart",
    category: "Data Modeling",
    code: `class User {
  const User({required this.id, required this.name});

  final int id;
  final String name;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
    );
  }
}`,
  },
  {
    slug: "dart-future-timeout",
    title: "Add a Timeout to a Future",
    description: "Bound asynchronous work and handle timeout failures at the call site.",
    language: "Dart",
    category: "Asynchronous",
    code: `Future<String> loadProfile() async {
  try {
    return await fetchProfile().timeout(
      const Duration(seconds: 5),
    );
  } on TimeoutException {
    throw StateError('Profile request timed out');
  }
}`,
  },
  {
    slug: "dart-group-by",
    title: "Group Items by Key",
    description: "Build a map of related records with a single pass over the collection.",
    language: "Dart",
    category: "Data Transformation",
    code: `Map<K, List<T>> groupBy<T, K>(
  Iterable<T> items,
  K Function(T) keyOf,
) {
  final groups = <K, List<T>>{};
  for (final item in items) {
    groups.putIfAbsent(keyOf(item), () => []).add(item);
  }
  return groups;
}`,
  },
  {
    slug: "lua-table-default",
    title: "Provide a Table Default",
    description: "Use a metatable to provide a fallback for missing configuration keys.",
    language: "Lua",
    category: "Data Handling",
    code: `local defaults = {
  theme = "dark",
  retries = 3,
}

local settings = setmetatable({}, {
  __index = defaults,
})

print(settings.theme)
print(settings.retries)`,
  },
  {
    slug: "lua-safe-file",
    title: "Read a File with Explicit Errors",
    description: "Check file operations and close resources even if reading fails.",
    language: "Lua",
    category: "Files",
    code: `local function read_file(path)
  local file, open_error = io.open(path, "r")
  if not file then
    return nil, open_error
  end

  local contents, read_error = file:read("*a")
  file:close()

  if not contents then
    return nil, read_error
  end
  return contents
end`,
  },
  {
    slug: "lua-sort-records",
    title: "Sort Records by a Field",
    description: "Use table.sort with a deterministic comparison function.",
    language: "Lua",
    category: "Data Transformation",
    code: `table.sort(users, function(left, right)
  if left.name == right.name then
    return left.id < right.id
  end
  return left.name:lower() < right.name:lower()
end)

for _, user in ipairs(users) do
  print(user.name)
end`,
  },
  {
    slug: "r-summary-by-group",
    title: "Summarize Data by Group",
    description: "Aggregate a numeric column for each group using base R.",
    language: "R",
    category: "Analytics",
    code: `summary_by_team <- aggregate(
  hours ~ team,
  data = work_log,
  FUN = sum,
  na.rm = TRUE
)

summary_by_team[order(-summary_by_team$hours), ]`,
  },
  {
    slug: "r-safe-missing-values",
    title: "Filter Missing Values",
    description: "Use complete.cases to filter rows with missing values in selected columns.",
    language: "R",
    category: "Data Quality",
    code: `required_columns <- c("email", "created_at")
complete_rows <- records[
  complete.cases(records[required_columns]),
]

clean_records <- droplevels(complete_rows)`,
  },
  {
    slug: "r-reproducible-sample",
    title: "Reproducible Random Sampling",
    description: "Set a random seed so sampling results can be reproduced.",
    language: "R",
    category: "Analytics",
    code: `set.seed(2026)

sampled_rows <- sample(
  seq_len(nrow(dataset)),
  size = min(100, nrow(dataset)),
  replace = FALSE
)

sampled_data <- dataset[sampled_rows, , drop = FALSE]`,
  },
  {
    slug: "scala-option-composition",
    title: "Compose Optional Lookups",
    description: "Chain Option-returning operations without nested null checks.",
    language: "Scala",
    category: "Type Safety",
    code: `case class User(id: Long, email: String)

def findUser(id: Long): Option[User] = ???
def primaryEmail(user: User): Option[String] = ???

val email: Option[String] =
  findUser(42L).flatMap(primaryEmail)

email.foreach(println)`,
  },
  {
    slug: "scala-group-by",
    title: "Group Records by a Field",
    description: "Use groupMap to group records and project the values in one operation.",
    language: "Scala",
    category: "Data Transformation",
    code: `case class Event(team: String, title: String)

val titlesByTeam: Map[String, List[String]] =
  events.groupMap(_.team)(_.title)

titlesByTeam.foreach { case (team, titles) =>
  println(s"$team: \${titles.size} events")
}`,
  },
  {
    slug: "scala-validated-input",
    title: "Parse Input into Either",
    description: "Return a descriptive validation error instead of throwing for expected input issues.",
    language: "Scala",
    category: "Validation",
    code: `def parsePort(value: String): Either[String, Int] =
  value.toIntOption
    .filter(port => port >= 1 && port <= 65535)
    .toRight("Port must be between 1 and 65535")

parsePort("8080").fold(
  error => println(error),
  port => println(s"Listening on $port")
)`,
  },
  {
    slug: "perl-safe-open",
    title: "Open a File with Lexical Handles",
    description: "Use a lexical file handle and check failures instead of using global handles.",
    language: "Perl",
    category: "Files",
    code: `use strict;
use warnings;

my $path = "input.txt";
open my $fh, "<", $path
  or die "Cannot open $path: $!";

while (my $line = <$fh>) {
  print $line;
}

close $fh or die "Cannot close $path: $!";`,
  },
  {
    slug: "perl-count-words",
    title: "Count Words in a File",
    description: "Normalize whitespace and count tokens with a straightforward split.",
    language: "Perl",
    category: "Text Processing",
    code: `use strict;
use warnings;

my $text = "Build useful tools for developers";
my @words = grep { length } split /\\s+/, $text;

printf "Word count: %d\\n", scalar @words;`,
  },
  {
    slug: "perl-validate-email-basic",
    title: "Validate a Simple Email Shape",
    description: "Perform a lightweight syntax check; use a dedicated library for full email validation.",
    language: "Perl",
    category: "Validation",
    code: `use strict;
use warnings;

sub looks_like_email {
  my ($value) = @_;
  return defined $value
    && $value =~ /\\A[^\\s\\@]+\\@[^\\s\\@]+\\.[^\\s\\@]+\\z/;
}

die "Invalid email" unless looks_like_email("dev@example.com");`,
  },
  {
    slug: "powershell-error-handling",
    title: "Handle PowerShell Errors",
    description: "Stop on command failures and catch only the specific operation that can fail.",
    language: "PowerShell",
    category: "Error Handling",
    code: `$ErrorActionPreference = 'Stop'

try {
    $content = Get-Content -LiteralPath '.\\settings.json' -Raw
    $settings = $content | ConvertFrom-Json
}
catch [System.IO.IOException] {
    Write-Error "Unable to read settings: $($_.Exception.Message)"
    throw
}`,
  },
  {
    slug: "powershell-json-output",
    title: "Write Structured JSON",
    description: "Serialize objects as JSON and write UTF-8 output to a file.",
    language: "PowerShell",
    category: "Files",
    code: `$payload = [ordered]@{
    status = 'ok'
    generatedAt = [DateTime]::UtcNow.ToString('o')
    count = 3
}

$json = $payload | ConvertTo-Json -Depth 5
Set-Content -LiteralPath '.\\report.json' -Value $json -Encoding utf8`,
  },
  {
    slug: "powershell-filter-processes",
    title: "Filter and Sort Objects",
    description: "Use the pipeline to filter objects before sorting and selecting properties.",
    language: "PowerShell",
    category: "Data Transformation",
    code: `Get-Process |
    Where-Object { $_.CPU -gt 10 } |
    Sort-Object -Property CPU -Descending |
    Select-Object -First 10 Name, Id, CPU |
    Format-Table -AutoSize`,
  },
  ...extraSnippets,
];