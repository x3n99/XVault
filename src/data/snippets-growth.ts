import type { Snippet } from "./snippets";

type Entry = readonly [slug: string, title: string, description: string, code: string];

function group(language: string, category: string, entries: Entry[]): Snippet[] {
  return entries.map(([slug, title, description, code]) => ({
    slug: `xv-${slug}`,
    title,
    description,
    language,
    category,
    code,
  }));
}

export const growthSnippets: Snippet[] = [
  ...group("JavaScript", "Browser APIs", [
    ["storage-json", "Safely Read JSON from Storage", "Handle missing or malformed local storage data with an explicit fallback.", `function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error("Could not read stored data:", error);
    return fallback;
  }
}`],
    ["fetch-query", "Build a Fetch Query String", "Encode optional filters with URLSearchParams before making a request.", `const params = new URLSearchParams({
  search: "web platform",
  page: "2",
});

const response = await fetch(\`/api/items?\${params}\`);`],
    ["parallel-fetch", "Fetch Independent Resources in Parallel", "Use Promise.all when every response is required before continuing.", `const [profileResponse, settingsResponse] = await Promise.all([
  fetch("/api/profile"),
  fetch("/api/settings"),
]);

const [profile, settings] = await Promise.all([
  profileResponse.json(),
  settingsResponse.json(),
]);`],
    ["event-delegation", "Delegate Click Events", "Handle clicks on current and future list items through one parent listener.", `document.querySelector(".list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  console.log("Action:", button.dataset.action);
});`],
    ["clipboard-copy", "Copy Text to the Clipboard", "Use the secure Clipboard API and report failures to the caller.", `async function copyText(text) {
  if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
  await navigator.clipboard.writeText(text);
}`],
    ["relative-time", "Format a Relative Time", "Use Intl.RelativeTimeFormat instead of hard-coded translated strings.", `const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function relativeDays(daysFromNow) {
  return formatter.format(daysFromNow, "day");
}`],
    ["object-group-by", "Group Records by a Property", "Collect records into buckets without mutating the original array.", `function groupBy(items, keyOf) {
  return items.reduce((groups, item) => {
    const key = keyOf(item);
    (groups[key] ??= []).push(item);
    return groups;
  }, {});
}`],
    ["array-chunk", "Split an Array into Batches", "Create fixed-size batches for pagination or bounded processing.", `function chunk(items, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError("Invalid size");
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}`],
    ["stable-unique", "Remove Duplicate Values", "Keep the first occurrence of each value while preserving order.", `const uniqueValues = (values) => [...new Set(values)];`],
    ["structured-clone", "Clone Structured Data", "Use the platform clone operation for supported objects instead of JSON round-tripping.", `const clonedState = structuredClone(state);`],
    ["wait-for-element", "Wait for an Element to Appear", "Observe DOM mutations and disconnect the observer after finding the target.", `function waitForElement(selector, root = document) {
  const existing = root.querySelector(selector);
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = root.querySelector(selector);
      if (!element) return;
      observer.disconnect();
      resolve(element);
    });
    observer.observe(root, { childList: true, subtree: true });
  });
}`],
    ["request-animation-frame", "Run Work on the Next Animation Frame", "Schedule visual updates before the browser paints.", `function updateLayout(callback) {
  requestAnimationFrame(() => {
    callback();
  });
}`],
    ["parse-cookie", "Read a Cookie by Name", "Parse encoded cookie names and values without splitting on equals signs in values.", `function getCookie(name) {
  const prefix = \`\${encodeURIComponent(name)}=\`;
  const cookie = document.cookie.split("; ").find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}`],
    ["form-data-object", "Convert Form Data to an Object", "Collect repeated form fields as arrays rather than silently dropping values.", `function formDataToObject(formData) {
  return [...formData.entries()].reduce((result, [key, value]) => {
    const current = result[key];
    result[key] = current === undefined
      ? value
      : Array.isArray(current) ? [...current, value] : [current, value];
    return result;
  }, {});
}`],
    ["abortable-delay", "Create an Abortable Delay", "Clear the pending timer and reject when the supplied signal is cancelled.", `function delay(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(resolve, milliseconds);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(signal.reason);
    }, { once: true });
  });
}`],
    ["safe-json-parse", "Return a Result from JSON Parsing", "Keep parsing failures explicit instead of hiding them behind an empty object.", `function parseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error };
  }
}`],
  ]),
  ...group("TypeScript", "Type Safety", [
    ["assert-never", "Enforce Exhaustive Switches", "Make the compiler report when a new union member is not handled.", `type Status = "queued" | "running" | "done";

function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function label(status: Status): string {
  switch (status) {
    case "queued": return "Waiting";
    case "running": return "In progress";
    case "done": return "Complete";
    default: return assertNever(status);
  }
}`],
    ["result-type", "Model Success and Failure Results", "Represent expected failures as a discriminated union instead of ambiguous null values.", `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function unwrap<T, E>(result: Result<T, E>): T {
  if (!result.ok) throw result.error;
  return result.value;
}`],
    ["typed-debounce", "Type a Debounced Callback", "Preserve a callback's parameter types in a reusable debounce helper.", `function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), wait);
  };
}`],
    ["record-from-keys", "Build a Record from a Key Union", "Require a value for every member of a finite key set.", `type Theme = "light" | "dark";

const themeLabels: Record<Theme, string> = {
  light: "Light theme",
  dark: "Dark theme",
};`],
    ["readonly-config", "Declare Immutable Configuration", "Prevent accidental mutation of nested settings with const assertions.", `const config = {
  retries: 3,
  endpoints: ["/api/users", "/api/teams"],
} as const;`],
    ["typed-event-handler", "Type a DOM Event Handler", "Narrow the event target before reading element-specific properties.", `function onInput(event: Event): string {
  const target = event.currentTarget;
  if (!(target instanceof HTMLInputElement)) {
    throw new TypeError("Expected an input element");
  }
  return target.value;
}`],
    ["optional-property-guard", "Narrow an Optional Property", "Check the property value before passing it to a function that requires a string.", `type Account = { email?: string };

function sendReceipt(account: Account) {
  if (account.email === undefined) return;
  return deliverEmail(account.email);
}`],
    ["typed-omit", "Create a Safe Partial Update", "Allow selected fields to change while keeping an immutable identifier.", `type User = { id: string; name: string; active: boolean };
type UserUpdate = Partial<Omit<User, "id">>;

function updateUser(id: User["id"], changes: UserUpdate) {
  return saveUser({ id, ...changes });
}`],
    ["generic-key-value", "Type a Key-Value Getter", "Restrict object keys to valid properties and infer the returned value type.", `function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}`],
    ["promise-value", "Extract a Promise's Value Type", "Reuse Awaited to describe the resolved type of nested asynchronous work.", `type ApiResponse = Promise<{ data: Promise<string[]> }>;
type ResolvedData = Awaited<ApiResponse>["data"];
type Items = Awaited<ResolvedData>;`],
    ["safe-parse-unknown", "Parse JSON as Unknown", "Keep untrusted JSON typed as unknown until a runtime validator narrows it.", `function parseUnknown(text: string): unknown {
  return JSON.parse(text) as unknown;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}`],
    ["typed-map-values", "Preserve Map Key and Value Types", "Declare both Map generics to avoid widening values to unknown.", `const cache = new Map<string, { expiresAt: number; value: string }>();
cache.set("home", { expiresAt: Date.now() + 60_000, value: "cached" });`],
  ]),
  ...group("Python", "Data Processing", [
    ["dict-get-default", "Read a Dictionary with a Default", "Use get to avoid a KeyError when a field is optional.", `timeout = settings.get("timeout", 30)`],
    ["sort-dictionaries", "Sort Dictionaries by a Field", "Use a key function to order records without altering their contents.", `users_by_name = sorted(users, key=lambda user: user["name"].casefold())`],
    ["enumerate-lines", "Read a File with Line Numbers", "Use enumerate to retain source line numbers while streaming a file.", `with open("app.log", encoding="utf-8") as log_file:
    for line_number, line in enumerate(log_file, start=1):
        if "ERROR" in line:
            print(line_number, line.rstrip())`],
    ["safe-temp-file", "Write a Temporary File", "Let TemporaryDirectory clean up a scratch directory after the operation.", `from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as directory:
    output = Path(directory) / "result.txt"
    output.write_text("complete", encoding="utf-8")`],
    ["dataclass-slots", "Define a Slotted Data Class", "Use dataclasses to create compact records with validated construction.", `from dataclasses import dataclass

@dataclass(slots=True)
class Point:
    x: float
    y: float`],
    ["retry-decorator", "Retry a Transient Operation", "Retry only the exception types that are known to be transient.", `import time

def retry(operation, attempts=3, wait=0.25):
    for attempt in range(attempts):
        try:
            return operation()
        except TimeoutError:
            if attempt + 1 == attempts:
                raise
            time.sleep(wait * (2 ** attempt))`],
    ["bounded-queue", "Process Items with a Bounded Queue", "Apply backpressure by limiting how many items can wait in memory.", `from queue import Queue

work = Queue(maxsize=100)
work.put("job-1")
job = work.get()
try:
    process(job)
finally:
    work.task_done()`],
    ["flatten-one-level", "Flatten Nested Lists One Level", "Use a comprehension to flatten one level while preserving item order.", `flattened = [value for group in nested for value in group]`],
    ["safe-dict-merge", "Merge Defaults with Overrides", "Let explicit configuration override defaults without mutating either mapping.", `effective_settings = {**defaults, **user_settings}`],
    ["decimal-money", "Calculate Currency with Decimal", "Avoid binary floating-point rounding for decimal currency values.", `from decimal import Decimal

price = Decimal("19.95")
tax = Decimal("0.08")
total = price * (Decimal("1") + tax)`],
    ["path-extension", "Find Files by Extension", "Use pathlib globbing to locate matching files under a directory.", `from pathlib import Path

python_files = list(Path("src").rglob("*.py"))`],
    ["csv-dict-reader", "Read CSV Rows by Column Name", "Use DictReader to associate each cell with its header.", `import csv

with open("users.csv", newline="", encoding="utf-8") as csv_file:
    for row in csv.DictReader(csv_file):
        print(row["email"])`],
    ["url-encode-query", "Encode URL Query Parameters", "Use urlencode instead of joining raw values into a URL.", `from urllib.parse import urlencode

query = urlencode({"search": "red shoes", "page": 2})
url = f"https://example.test/items?{query}"`],
    ["json-atomic-write", "Write JSON to a Temporary File", "Write then replace the destination so readers do not observe a partial file.", `import json
from pathlib import Path

destination = Path("settings.json")
temporary = destination.with_suffix(".json.tmp")
temporary.write_text(json.dumps(settings, indent=2), encoding="utf-8")
temporary.replace(destination)`],
    ["async-gather-results", "Gather Async Tasks Together", "Run independent coroutines concurrently and preserve their result order.", `import asyncio

async def load_dashboard():
    profile, alerts = await asyncio.gather(
        fetch_profile(),
        fetch_alerts(),
    )
    return {"profile": profile, "alerts": alerts}`],
    ["context-manager-lock", "Protect Shared State with a Lock", "Use an async context manager to release the lock even if work raises.", `import asyncio

lock = asyncio.Lock()

async def update_state():
    async with lock:
        state["count"] += 1`],
  ]),
  ...group("SQL", "Database", [
    ["left-join-missing", "Find Rows Without a Match", "Use a left join and null check to identify unmatched records.", `SELECT customers.id, customers.email
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id
WHERE orders.id IS NULL;`],
    ["group-having", "Filter Aggregated Groups", "Use HAVING to filter after grouping and aggregation.", `SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 5;`],
    ["conditional-count", "Count Rows by Condition", "Use CASE inside aggregates to produce multiple conditional counts.", `SELECT
  COUNT(CASE WHEN status = 'open' THEN 1 END) AS open_count,
  COUNT(CASE WHEN status = 'closed' THEN 1 END) AS closed_count
FROM tickets;`],
    ["latest-row-per-group", "Select the Latest Row per Group", "Use ROW_NUMBER to keep exactly one most-recent record for each account.", `WITH ranked AS (
  SELECT events.*,
    ROW_NUMBER() OVER (
      PARTITION BY account_id ORDER BY created_at DESC
    ) AS row_number
  FROM events
)
SELECT * FROM ranked WHERE row_number = 1;`],
    ["running-total", "Calculate a Running Total", "Use a window frame to sum values up to the current row.", `SELECT
  created_at,
  amount,
  SUM(amount) OVER (
    ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM payments;`],
    ["safe-upsert", "Insert or Update a Record", "Use a unique key conflict target to make a write idempotent.", `INSERT INTO preferences (user_id, theme)
VALUES (42, 'dark')
ON CONFLICT (user_id)
DO UPDATE SET theme = EXCLUDED.theme;`],
    ["transaction-transfer", "Transfer Funds in a Transaction", "Keep both sides of a balance transfer in one atomic transaction.", `BEGIN;
UPDATE accounts SET balance = balance - 25 WHERE id = 1;
UPDATE accounts SET balance = balance + 25 WHERE id = 2;
COMMIT;`],
    ["keyset-pagination", "Paginate with a Cursor", "Use a stable sort key to avoid scanning increasingly large offsets.", `SELECT id, created_at, title
FROM articles
WHERE (created_at, id) < (:cursor_created_at, :cursor_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;`],
    ["recursive-tree", "Walk a Hierarchy with a Recursive CTE", "Traverse parent-child relationships without issuing one query per level.", `WITH RECURSIVE descendants AS (
  SELECT id, parent_id, name FROM categories WHERE id = :root_id
  UNION ALL
  SELECT child.id, child.parent_id, child.name
  FROM categories child
  JOIN descendants parent ON child.parent_id = parent.id
)
SELECT * FROM descendants;`],
    ["date-bucket", "Group Events by Day", "Truncate timestamps to a day before counting events.", `SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS total
FROM events
WHERE created_at >= :start_date
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day;`],
    ["delete-duplicates", "Remove Duplicate Rows Safely", "Rank duplicates first, then delete all but the earliest row.", `WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (
    PARTITION BY email ORDER BY created_at, id
  ) AS row_number
  FROM subscribers
)
DELETE FROM subscribers
WHERE id IN (SELECT id FROM ranked WHERE row_number > 1);`],
    ["check-constraint", "Add a Range Constraint", "Keep invalid values out of the table with a database-level check.", `ALTER TABLE products
ADD CONSTRAINT products_price_nonnegative
CHECK (price >= 0);`],
  ]),
  ...group("CSS", "Web Development", [
    ["fluid-type", "Create Fluid Responsive Type", "Scale a heading smoothly between viewport sizes with clamp.", `.page-title {
  font-size: clamp(2rem, 1.2rem + 3vw, 4.5rem);
}`],
    ["auto-fit-grid", "Create an Auto-Fitting Card Grid", "Let grid cards wrap naturally while keeping a useful minimum width.", `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}`],
    ["focus-visible-ring", "Style Keyboard Focus", "Make keyboard focus visible without adding a ring to every pointer click.", `:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}`],
    ["reduced-motion", "Respect Reduced Motion Preferences", "Disable nonessential motion for users who request reduced animation.", `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`],
    ["sticky-footer-layout", "Keep a Footer at the Bottom", "Use a column flex layout so short pages still fill the viewport.", `body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}`],
    ["safe-area-padding", "Pad Content Around Device Notches", "Use safe-area insets for edge-to-edge mobile layouts.", `.page-shell {
  padding-inline: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
}`],
    ["aspect-ratio-media", "Keep Media at a Consistent Ratio", "Reserve a stable media box before an image finishes loading.", `.media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`],
    ["container-query-card", "Adapt a Card to Its Container", "Use container queries when a component can appear in different layout widths.", `.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 32rem) {
  .card {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }
}`],
    ["dark-mode-colors", "Define Theme Colors with Custom Properties", "Centralize colors so a theme can change without rewriting component rules.", `:root {
  color-scheme: light dark;
  --surface: #ffffff;
  --text: #1b1b1b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #171717;
    --text: #f2f2f2;
  }
}`],
    ["truncate-text", "Truncate a Single Line of Text", "Prevent long labels from expanding a flex or grid layout.", `.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}`],
  ]),
  ...group("HTML", "Accessibility", [
    ["skip-link", "Add a Skip Navigation Link", "Let keyboard users jump directly to the main content.", `<a class="skip-link" href="#main">Skip to content</a>
<main id="main" tabindex="-1">
  <h1>Page content</h1>
</main>`],
    ["responsive-image", "Serve Responsive Image Sizes", "Let the browser choose an image source that fits the viewport.", `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="A mountain lake at sunrise"
/>`],
    ["native-details", "Create a Native Disclosure", "Use the built-in details element for a lightweight expandable section.", `<details>
  <summary>Shipping information</summary>
  <p>Orders are dispatched within two business days.</p>
</details>`],
    ["email-input", "Validate an Email Field", "Use native email input semantics and associate a visible label.", `<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email" required />`],
    ["external-link", "Mark a New-Tab External Link", "Use rel noopener to prevent a new page from controlling its opener.", `<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open example site
</a>`],
    ["data-table", "Mark Up a Data Table", "Associate column headers with cells so assistive technology can navigate data.", `<table>
  <caption>Monthly signups</caption>
  <thead><tr><th scope="col">Month</th><th scope="col">Signups</th></tr></thead>
  <tbody><tr><th scope="row">January</th><td>128</td></tr></tbody>
</table>`],
  ]),
  ...group("Bash", "Developer Tools", [
    ["strict-mode", "Enable Safer Shell Defaults", "Stop on command failures and unset variables, and propagate pipeline errors.", `#!/usr/bin/env bash
set -Eeuo pipefail`],
    ["check-command", "Check Whether a Command Exists", "Fail early with a clear message when a required executable is missing.", `command -v jq >/dev/null 2>&1 || {
  printf 'Required command not found: jq\\n' >&2
  exit 1
}`],
    ["read-lines", "Read a File Line by Line", "Use a redirected loop so the loop runs in the current shell.", `while IFS= read -r line || [[ -n "$line" ]]; do
  printf '%s\\n' "$line"
done < "input.txt"`],
    ["temporary-directory", "Create and Clean Up a Temporary Directory", "Register cleanup on exit instead of leaving temporary files behind.", `tmp_dir="$(mktemp -d)"
trap 'rm -rf -- "$tmp_dir"' EXIT

printf '%s\\n' "working" > "$tmp_dir/state.txt"`],
    ["require-argument", "Validate a Required Argument", "Check positional arguments before using them in a command.", `if [[ $# -lt 1 ]]; then
  printf 'Usage: %s <file>\\n' "$0" >&2
  exit 2
fi

input_file=$1`],
    ["wait-for-service", "Wait for a Local TCP Service", "Retry a bounded number of times and return failure if the service stays unavailable.", `for attempt in {1..20}; do
  if nc -z 127.0.0.1 5432; then
    exit 0
  fi
  sleep 1
done
printf 'Service did not become ready\\n' >&2
exit 1`],
    ["safe-find-delete", "Preview Files Before Deleting", "Print matching paths first, then use the same predicate for deletion.", `find ./build -type f -name '*.tmp' -print
# After reviewing the list:
find ./build -type f -name '*.tmp' -delete`],
    ["timestamped-backup", "Create a Timestamped Backup", "Include a UTC timestamp in a backup filename to avoid overwriting older copies.", `timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
cp -- "settings.json" "settings.$timestamp.json"`],
  ]),
  ...group("Go", "Backend Development", [
    ["http-json-response", "Write a JSON HTTP Response", "Set the content type and handle encoding failures explicitly.", `func writeJSON(w http.ResponseWriter, value any) error {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(value)
}`],
    ["context-timeout", "Add a Timeout to a Context", "Cancel outbound work when a request exceeds its time budget.", `ctx, cancel := context.WithTimeout(parent, 2*time.Second)
defer cancel()

result, err := client.Fetch(ctx, resourceID)`],
    ["read-all-bounded", "Read a Bounded Request Body", "Limit bytes read from an HTTP body to reduce oversized input risk.", `body := http.MaxBytesReader(w, r.Body, 1<<20)
defer body.Close()

payload, err := io.ReadAll(body)
if err != nil {
	http.Error(w, "invalid request body", http.StatusBadRequest)
	return
}`],
    ["worker-pool", "Process Jobs with a Worker Pool", "Use a fixed number of goroutines to bound concurrent work.", `jobs := make(chan Job)
var workers sync.WaitGroup

for i := 0; i < 4; i++ {
	workers.Add(1)
	go func() {
		defer workers.Done()
		for job := range jobs {
			process(job)
		}
	}()
}
close(jobs)
workers.Wait()`],
    ["sort-structs", "Sort Structs by a Field", "Use slices.SortFunc to sort records with an explicit comparator.", `slices.SortFunc(users, func(a, b User) int {
	return strings.Compare(a.Name, b.Name)
})`],
    ["atomic-counter", "Count Concurrent Operations", "Use an atomic integer when independent goroutines update a simple counter.", `var requests atomic.Int64

func recordRequest() {
	requests.Add(1)
}`],
    ["url-query-encode", "Encode Query Parameters", "Build query strings with url.Values so special characters are escaped.", `values := url.Values{}
values.Set("search", "blue sky")
values.Set("page", "2")
endpoint := "/search?" + values.Encode()`],
    ["copy-stream", "Copy a Stream to a File", "Use io.Copy for efficient streaming and close the destination file.", `file, err := os.Create("archive.bin")
if err != nil {
	return err
}
defer file.Close()

_, err = io.Copy(file, source)
return err`],
  ]),
  ...group("Rust", "Error Handling", [
    ["option-map", "Transform an Optional Value", "Map a value only when present without manually matching both cases.", `let display_name = user.nickname
    .as_deref()
    .map(str::trim)
    .filter(|name| !name.is_empty())
    .unwrap_or("Guest");`],
    ["result-context", "Add Context to an Error", "Use map_err to preserve the original failure while adding operation context.", `let config = std::fs::read_to_string(path)
    .map_err(|error| format!("could not read config: {error}"))?;`],
    ["collect-results", "Collect Results from an Iterator", "Collect into Result to stop at the first failing conversion.", `let numbers: Result<Vec<i32>, _> = values
    .iter()
    .map(|value| value.parse::<i32>())
    .collect();`],
    ["hashmap-entry", "Update a Map Entry in Place", "Use the entry API to initialize a missing counter or increment an existing one.", `let count = visits.entry(page.to_owned()).or_insert(0);
*count += 1;`],
    ["read-lines-error", "Read a File into Lines", "Propagate file and line-reading errors instead of silently skipping invalid data.", `let lines: Vec<String> = std::fs::read_to_string("input.txt")?
    .lines()
    .map(str::to_owned)
    .collect();`],
    ["thread-safe-counter", "Share an Atomic Counter", "Use relaxed ordering when only the numeric count matters, not synchronization.", `use std::sync::atomic::{AtomicUsize, Ordering};

static REQUESTS: AtomicUsize = AtomicUsize::new(0);
REQUESTS.fetch_add(1, Ordering::Relaxed);`],
  ]),
  ...group("PHP", "Web Development", [
    ["filter-email", "Validate an Email Address", "Use the built-in email filter and handle invalid input explicitly.", `$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if ($email === false || $email === null) {
    throw new InvalidArgumentException('A valid email is required.');
}`],
    ["json-response", "Return a JSON Response", "Set the response content type before encoding structured data.", `header('Content-Type: application/json; charset=utf-8');
echo json_encode(
    ['ok' => true, 'count' => count($items)],
    JSON_THROW_ON_ERROR
);`],
    ["safe-output", "Escape HTML Output", "Escape dynamic text before including it in HTML markup.", `function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

echo escapeHtml($displayName);`],
    ["array-partition", "Partition an Array by a Predicate", "Separate matching and non-matching values in one pass.", `[$active, $inactive] = array_reduce(
    $users,
    static function (array $groups, array $user): array {
        $groups[$user['active'] ? 0 : 1][] = $user;
        return $groups;
    },
    [[], []]
);`],
    ["filesystem-safe-path", "Resolve a Path Under a Directory", "Reject paths that escape the intended upload directory.", `$root = realpath(__DIR__ . '/uploads');
$candidate = realpath($root . DIRECTORY_SEPARATOR . $filename);

if ($candidate === false || !str_starts_with($candidate, $root . DIRECTORY_SEPARATOR)) {
    throw new RuntimeException('Invalid file path');
}`],
    ["date-immutable", "Parse a Date Immutably", "Use DateTimeImmutable so formatting and modification do not mutate shared state.", `$date = DateTimeImmutable::createFromFormat('!Y-m-d', $input);
if ($date === false) {
    throw new InvalidArgumentException('Expected YYYY-MM-DD');
}

$nextWeek = $date->modify('+7 days');`],
  ]),
  ...group("Java", "Collections", [
    ["grouping-by", "Group Objects by a Property", "Use Collectors.groupingBy to collect related records into lists.", `Map<String, List<Order>> byStatus = orders.stream()
    .collect(Collectors.groupingBy(Order::status));`],
    ["optional-fallback", "Provide an Optional Fallback", "Use orElseGet when the fallback is expensive and only needed for empty values.", `String displayName = user.nickname()
    .filter(name -> !name.isBlank())
    .orElseGet(() -> loadDefaultName(user.id()));`],
    ["try-with-resources", "Close a Resource Automatically", "Use try-with-resources so the stream closes on success and failure.", `try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.lines().toList();
}`],
    ["immutable-copy", "Make an Immutable List Copy", "Copy incoming values so callers cannot mutate the collection later.", `public record Team(String name, List<String> members) {
    public Team {
        members = List.copyOf(members);
    }
}`],
    ["comparing-chain", "Sort by Multiple Fields", "Chain comparators to specify a stable secondary ordering.", `Comparator<Person> order = Comparator
    .comparing(Person::lastName)
    .thenComparing(Person::firstName)
    .thenComparing(Person::id);`],
  ]),
  ...group("PowerShell", "Automation", [
    ["require-parameter", "Validate a Required Parameter", "Use parameter attributes to reject missing values before the script runs.", `param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Path
)`],
    ["safe-json-file", "Read JSON from a File", "Read the complete file and convert JSON into PowerShell objects.", `$settings = Get-Content -LiteralPath '.\\settings.json' -Raw |
    ConvertFrom-Json

if (-not $settings) {
    throw 'Settings file did not contain a JSON value.'
}`],
    ["filter-processes", "Filter Processes by Memory Use", "Select processes above a memory threshold and sort largest first.", `Get-Process |
    Where-Object { $_.WorkingSet64 -gt 500MB } |
    Sort-Object WorkingSet64 -Descending |
    Select-Object -First 10 Name, Id, WorkingSet64`],
    ["try-finally-cleanup", "Guarantee Temporary File Cleanup", "Use finally so cleanup runs whether the operation succeeds or fails.", `$temporaryPath = Join-Path $env:TEMP ([guid]::NewGuid().ToString())
try {
    Invoke-Work -OutputPath $temporaryPath
}
finally {
    Remove-Item -LiteralPath $temporaryPath -ErrorAction SilentlyContinue
}`],
    ["export-csv", "Export Selected Objects to CSV", "Choose fields explicitly before exporting to avoid leaking unrelated properties.", `Get-Service |
    Select-Object Name, Status, StartType |
    Export-Csv -LiteralPath '.\\services.csv' -NoTypeInformation`],
  ]),
];
