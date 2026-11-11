import type { Snippet } from "./snippets";
import { growthSnippets } from "./snippets-growth";

export const extraSnippets: Snippet[] = [
  {
    slug: "javascript-lru-cache",
    title: "Bounded LRU Cache",
    description: "Evict the least recently used entry when the cache reaches capacity.",
    language: "JavaScript",
    category: "Caching",
    code: `function createLruCache(limit) {
  const cache = new Map();
  return {
    get(key) {
      if (!cache.has(key)) return undefined;
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    set(key, value) {
      cache.delete(key);
      cache.set(key, value);
      if (cache.size > limit) cache.delete(cache.keys().next().value);
    },
  };
}`,
  },
  {
    slug: "javascript-url-query-state",
    title: "Update URL Query Parameters",
    description: "Preserve unrelated URL state when setting or removing a query parameter.",
    language: "JavaScript",
    category: "Browser APIs",
    code: `function updateQuery(key, value) {
  const url = new URL(location.href);
  if (value == null || value === "") url.searchParams.delete(key);
  else url.searchParams.set(key, String(value));

  history.replaceState(null, "", url);
}`,
  },
  {
    slug: "typescript-unknown-json",
    title: "Validate Unknown JSON",
    description: "Treat decoded data as unknown and narrow it before application use.",
    language: "TypeScript",
    category: "Validation",
    code: `type Profile = { id: string; name: string };

function isProfile(value: unknown): value is Profile {
  if (typeof value !== "object" || value === null) return false;
  return "id" in value && typeof value.id === "string"
    && "name" in value && typeof value.name === "string";
}

const value: unknown = JSON.parse(responseText);
if (!isProfile(value)) throw new Error("Invalid profile");`,
  },
  {
    slug: "typescript-typed-event-map",
    title: "Typed Event Map",
    description: "Associate event names with payload shapes at compile time.",
    language: "TypeScript",
    category: "Type Safety",
    code: `type AppEvents = {
  saved: { id: string };
  failed: { error: Error };
};

type Handler<T> = (payload: T) => void;
type EventName = keyof AppEvents;

function on<K extends EventName>(
  event: K,
  handler: Handler<AppEvents[K]>,
) {
  eventBus.addEventListener(event, (value) => handler(value as AppEvents[K]));
}`,
  },
  {
    slug: "python-context-manager",
    title: "Build a Context Manager",
    description: "Guarantee cleanup for a resource when a block succeeds or raises.",
    language: "Python",
    category: "Resource Management",
    code: `from contextlib import contextmanager


@contextmanager
def managed_connection(connect):
    connection = connect()
    try:
        yield connection
    finally:
        connection.close()


with managed_connection(connect) as connection:
    connection.execute("SELECT 1")`,
  },
  {
    slug: "python-bounded-async",
    title: "Limit Async Task Concurrency",
    description: "Use a semaphore to bound simultaneous asynchronous operations.",
    language: "Python",
    category: "Asynchronous",
    code: `import asyncio


async def map_limited(items, limit, operation):
    semaphore = asyncio.Semaphore(limit)

    async def run(item):
        async with semaphore:
            return await operation(item)

    return await asyncio.gather(*(run(item) for item in items))`,
  },
  {
    slug: "java-async-compose",
    title: "Compose Async Operations",
    description: "Chain CompletableFuture transformations and make the failure path explicit.",
    language: "Java",
    category: "Asynchronous",
    code: `CompletableFuture<String> displayName = fetchUser(userId)
    .thenApply(User::displayName)
    .exceptionally(error -> {
        logger.error("Could not load user", error);
        return "Unknown user";
    });`,
  },
  {
    slug: "java-access-order-cache",
    title: "Bounded Access-Ordered Cache",
    description: "Use an access-ordered LinkedHashMap for a compact LRU cache.",
    language: "Java",
    category: "Caching",
    code: `Map<String, String> cache = new LinkedHashMap<>(128, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        return size() > 100;
    }
};

cache.put("theme", "dark");`,
  },
  {
    slug: "c-parse-integer",
    title: "Parse an Integer Safely",
    description: "Check conversion errors, trailing characters, and integer range with strtol.",
    language: "C",
    category: "Validation",
    code: `#include <errno.h>
#include <limits.h>
#include <stdlib.h>

int parse_int(const char *text, int *result) {
    char *end = NULL;
    errno = 0;
    long value = strtol(text, &end, 10);

    if (errno == ERANGE || end == text || *end != '\\0' ||
        value < INT_MIN || value > INT_MAX) return -1;
    *result = (int)value;
    return 0;
}`,
  },
  {
    slug: "c-ring-buffer",
    title: "Fixed-Size Ring Buffer",
    description: "Maintain a rolling window without shifting elements on every insert.",
    language: "C",
    category: "Data Structures",
    code: `#include <stddef.h>

typedef struct {
    int *items;
    size_t capacity, next, count;
} RingBuffer;

void push(RingBuffer *buffer, int value) {
    buffer->items[buffer->next] = value;
    buffer->next = (buffer->next + 1) % buffer->capacity;
    if (buffer->count < buffer->capacity) buffer->count++;
}`,
  },
  {
    slug: "cpp-remove-matching",
    title: "Remove Matching Vector Elements",
    description: "Use the erase-remove idiom to remove values in one pass.",
    language: "C++",
    category: "Data Transformation",
    code: `#include <algorithm>
#include <vector>

void removeExpired(std::vector<Session>& sessions) {
    sessions.erase(
        std::remove_if(sessions.begin(), sessions.end(),
                       [](const Session& item) { return item.expired(); }),
        sessions.end());
}`,
  },
  {
    slug: "cpp-scope-cleanup",
    title: "Scope-Bound Cleanup",
    description: "Use RAII so cleanup executes on all normal and exceptional exit paths.",
    language: "C++",
    category: "Resource Management",
    code: `#include <memory>

using File = std::unique_ptr<FILE, decltype(&std::fclose)>;

File openFile(const char* path) {
    File file(std::fopen(path, "r"), &std::fclose);
    if (!file) throw std::runtime_error("Could not open file");
    return file;
}`,
  },
  {
    slug: "csharp-cancellation",
    title: "Propagate Cancellation Tokens",
    description: "Pass cancellation through each asynchronous operation.",
    language: "C#",
    category: "Asynchronous",
    code: `static async Task<string> LoadAsync(
    HttpClient client,
    Uri uri,
    CancellationToken cancellationToken)
{
    using var response = await client.GetAsync(uri, cancellationToken);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync(cancellationToken);
}`,
  },
  {
    slug: "csharp-async-stream",
    title: "Yield an Async Stream",
    description: "Stream large results incrementally while observing cancellation.",
    language: "C#",
    category: "Asynchronous",
    code: `static async IAsyncEnumerable<string> ReadLinesAsync(
    string path,
    [EnumeratorCancellation] CancellationToken token = default)
{
    using var reader = File.OpenText(path);
    while (await reader.ReadLineAsync(token) is { } line)
        yield return line;
}`,
  },
  {
    slug: "go-strict-json",
    title: "Reject Unknown JSON Fields",
    description: "Make request decoding strict so misspelled fields do not silently pass.",
    language: "Go",
    category: "Validation",
    code: `func decodeRequest(r io.Reader, target any) error {
    decoder := json.NewDecoder(r)
    decoder.DisallowUnknownFields()

    if err := decoder.Decode(target); err != nil {
        return fmt.Errorf("decode request: %w", err)
    }
    return nil
}`,
  },
  {
    slug: "go-context-timeout",
    title: "Bound Work with a Timeout",
    description: "Set a context deadline for downstream work and release its timer.",
    language: "Go",
    category: "Resilience",
    code: `ctx, cancel := context.WithTimeout(parent, 3*time.Second)
defer cancel()

result, err := client.Lookup(ctx, key)
if err != nil {
    return fmt.Errorf("lookup %q: %w", key, err)
}
return result, nil`,
  },
  {
    slug: "rust-parse-port",
    title: "Parse and Validate a Port",
    description: "Convert input into a bounded integer and return descriptive errors.",
    language: "Rust",
    category: "Validation",
    code: `fn parse_port(value: &str) -> Result<u16, String> {
    let port = value.parse::<u16>()
        .map_err(|error| format!("invalid port: {error}"))?;
    if port == 0 {
        return Err("port must be greater than zero".into());
    }
    Ok(port)
}`,
  },
  {
    slug: "rust-chunk-processing",
    title: "Process a Collection in Batches",
    description: "Split a slice into bounded chunks for batch-oriented work.",
    language: "Rust",
    category: "Data Processing",
    code: `for batch in records.chunks(500) {
    database.insert_many(batch).await?;
}

for batch in values.chunks_mut(100) {
    batch.sort_unstable();
}`,
  },
  {
    slug: "ruby-bounded-retry",
    title: "Retry a Transient Failure",
    description: "Retry only a known transient error with a finite attempt limit.",
    language: "Ruby",
    category: "Resilience",
    code: `def with_retries(attempts: 3)
  attempt = 0
  begin
    yield
  rescue Timeout::Error
    attempt += 1
    raise if attempt >= attempts
    sleep(0.2 * (2**(attempt - 1)))
    retry
  end
end`,
  },
  {
    slug: "ruby-batch-enumerable",
    title: "Process an Enumerable in Batches",
    description: "Split a large collection into smaller batches using each_slice.",
    language: "Ruby",
    category: "Data Processing",
    code: `records.each_slice(250) do |batch|
  persist_batch(batch)
end

active_ids = records
  .filter_map { |record| record.id if record.active? }
  .uniq`,
  },
  {
    slug: "swift-result-type",
    title: "Represent an Operation with Result",
    description: "Represent success and expected failure explicitly in a return value.",
    language: "Swift",
    category: "Error Handling",
    code: `enum LoadError: Error {
    case notFound
    case invalidData
}

func loadName(id: Int) -> Result<String, LoadError> {
    guard id > 0 else { return .failure(.notFound) }
    return .success("User \\(id)")
}`,
  },
  {
    slug: "swift-concurrent-task-group",
    title: "Run Independent Tasks Concurrently",
    description: "Use a throwing task group to run async work and collect every result.",
    language: "Swift",
    category: "Concurrency",
    code: `func loadAll(_ ids: [Int]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask { try await loadUser(id: id) }
        }
        var users: [User] = []
        for try await user in group { users.append(user) }
        return users
    }
}`,
  },
  {
    slug: "kotlin-read-only-state",
    title: "Expose Read-Only StateFlow",
    description: "Keep mutable state private and expose a read-only observable flow.",
    language: "Kotlin",
    category: "Concurrency",
    code: `class SessionStore {
    private val _session = MutableStateFlow<Session?>(null)
    val session: StateFlow<Session?> = _session.asStateFlow()

    fun update(value: Session?) {
        _session.value = value
    }
}`,
  },
  {
    slug: "kotlin-validate-result",
    title: "Capture a Fallible Operation",
    description: "Convert a specific operation's exception into an explicit Result value.",
    language: "Kotlin",
    category: "Error Handling",
    code: `suspend fun loadProfile(id: String): Result<Profile> =
    runCatching {
        require(id.isNotBlank()) { "Profile id is required" }
        api.fetchProfile(id)
    }.onFailure { error ->
        logger.warn("Profile request failed", error)
    }`,
  },
  {
    slug: "dart-stream-pipeline",
    title: "Filter and Transform a Stream",
    description: "Compose stream transformations while preserving asynchronous delivery.",
    language: "Dart",
    category: "Asynchronous",
    code: `Stream<String> activeNames(Stream<User> users) {
  return users
      .where((user) => user.isActive)
      .map((user) => user.name.trim())
      .where((name) => name.isNotEmpty);
}

await for (final name in activeNames(userStream)) {
  print(name);
}`,
  },
  {
    slug: "dart-immutable-copy",
    title: "Copy an Immutable Model",
    description: "Use copyWith to derive updated state without mutating the current model.",
    language: "Dart",
    category: "Data Modeling",
    code: `class Settings {
  const Settings({required this.theme, required this.compact});
  final String theme;
  final bool compact;

  Settings copyWith({String? theme, bool? compact}) => Settings(
        theme: theme ?? this.theme,
        compact: compact ?? this.compact,
      );
}`,
  },
  {
    slug: "lua-safe-call",
    title: "Capture a Fallible Call",
    description: "Use pcall to capture runtime failures and report them to the caller.",
    language: "Lua",
    category: "Error Handling",
    code: `local function run_safely(operation)
  local ok, result = pcall(operation)
  if not ok then
    return nil, tostring(result)
  end
  return result
end

local value, err = run_safely(load_config)`,
  },
  {
    slug: "lua-copy-table",
    title: "Copy a Table Before Updating",
    description: "Copy key-value pairs into a new table to preserve the original.",
    language: "Lua",
    category: "Data Handling",
    code: `local function shallow_copy(source)
  local copy = {}
  for key, value in pairs(source) do
    copy[key] = value
  end
  return copy
end

local updated = shallow_copy(defaults)
updated.theme = "light"`,
  },
  {
    slug: "r-dplyr-summary",
    title: "Summarize Data with dplyr",
    description: "Filter, group, and summarize a data frame in a readable pipeline.",
    language: "R",
    category: "Data Transformation",
    code: `library(dplyr)

monthly_totals <- orders |>
  filter(status == "paid") |>
  mutate(month = as.Date(format(created_at, "%Y-%m-01"))) |>
  group_by(month) |>
  summarize(revenue = sum(total, na.rm = TRUE), .groups = "drop")`,
  },
  {
    slug: "r-labeled-bar-chart",
    title: "Create a Labeled Bar Chart",
    description: "Plot a summary with readable labels, ordering, and a minimal theme.",
    language: "R",
    category: "Visualization",
    code: `library(ggplot2)

ggplot(summary_by_team, aes(x = reorder(team, hours), y = hours)) +
  geom_col(fill = "#7c3aed") +
  coord_flip() +
  labs(x = "Team", y = "Hours", title = "Hours by team") +
  theme_minimal()`,
  },
  {
    slug: "scala-resource-using",
    title: "Release a Resource with Using",
    description: "Close resources deterministically, including when processing fails.",
    language: "Scala",
    category: "Resource Management",
    code: `import scala.util.Using

def readFirstLine(path: String): Either[Throwable, String] =
  Using(scala.io.Source.fromFile(path, "UTF-8")) { source =>
    source.getLines().take(1).mkString
  }.toEither`,
  },
  {
    slug: "scala-parse-port",
    title: "Parse a Port into Either",
    description: "Represent expected input validation errors without throwing exceptions.",
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
    slug: "perl-lexical-file-read",
    title: "Read a File with a Lexical Handle",
    description: "Use a lexical file handle and check open and close failures.",
    language: "Perl",
    category: "Files",
    code: `use strict;
use warnings;

my $path = "input.txt";
open my $fh, "<", $path or die "Cannot open $path: $!";

while (my $line = <$fh>) {
  print $line;
}

close $fh or die "Cannot close $path: $!";`,
  },
  {
    slug: "perl-filter-transform",
    title: "Filter and Transform a List",
    description: "Combine grep and map to select records and derive a new list.",
    language: "Perl",
    category: "Data Transformation",
    code: `use strict;
use warnings;

my @active_names = map { $_->{name} }
  grep { $_->{active} && defined $_->{name} }
  @users;

print "$_\\n" for @active_names;`,
  },
  {
    slug: "powershell-atomic-file",
    title: "Replace a File After a Successful Write",
    description: "Write to a temporary file first, then atomically replace the destination.",
    language: "PowerShell",
    category: "Files",
    code: `$destination = Join-Path $PWD 'settings.json'
$temporary = "$destination.tmp"

try {
    $json | Set-Content -LiteralPath $temporary -Encoding utf8
    Move-Item -LiteralPath $temporary -Destination $destination -Force
}
finally {
    if (Test-Path -LiteralPath $temporary) {
        Remove-Item -LiteralPath $temporary -Force
    }
}`,
  },
  {
    slug: "powershell-rest-json",
    title: "Call a JSON API",
    description: "Send a bounded HTTP request and deserialize JSON into PowerShell objects.",
    language: "PowerShell",
    category: "Networking",
    code: `$response = Invoke-RestMethod \`
    -Method Get \`
    -Uri 'https://api.example.com/health' \`
    -Headers @{ Accept = 'application/json' } \`
    -TimeoutSec 10

$response.status`,
  },
  {
    slug: "php-stream-csv",
    title: "Stream a CSV Download",
    description: "Write rows incrementally so large exports do not need to fit in memory.",
    language: "PHP",
    category: "Files",
    code: `header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="users.csv"');

$output = fopen('php://output', 'wb');
if ($output === false) {
    throw new RuntimeException('Cannot open output stream.');
}

fputcsv($output, ['id', 'email']);
foreach ($users as $user) {
    fputcsv($output, [$user['id'], $user['email']]);
}
fclose($output);`,
  },
  {
    slug: "php-hash-reset-token",
    title: "Store Only a Reset Token Hash",
    description: "Generate a cryptographically random token and persist only its digest.",
    language: "PHP",
    category: "Security",
    code: `$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);
$expiresAt = new DateTimeImmutable('+30 minutes');

// Store the hash and expiry; send the original token once.
$statement = $pdo->prepare(
    'INSERT INTO password_resets (user_id, token_hash, expires_at)
     VALUES (:user_id, :token_hash, :expires_at)'
);
$statement->execute([
    'user_id' => $userId,
    'token_hash' => $tokenHash,
    'expires_at' => $expiresAt->format('Y-m-d H:i:s'),
]);`,
  },
  {
    slug: "css-focus-within",
    title: "Highlight an Active Form Field",
    description: "Style a field wrapper whenever one of its child controls has focus.",
    language: "CSS",
    category: "Forms",
    code: `.field {
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.field:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgb(197 244 103 / 18%);
}`,
  },
  {
    slug: "css-system-color-scheme",
    title: "Respect the System Color Scheme",
    description: "Provide theme variables that adapt to the user's preferred color scheme.",
    language: "CSS",
    category: "Theming",
    code: `:root {
  color-scheme: light dark;
  --page-bg: #fff;
  --page-text: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page-bg: #111;
    --page-text: #eee;
  }
}

body { background: var(--page-bg); color: var(--page-text); }`,
  },
  {
    slug: "sql-mysql-upsert",
    title: "MySQL Insert or Update",
    description: "Use a unique key and ON DUPLICATE KEY UPDATE for an atomic upsert.",
    language: "SQL",
    category: "MySQL",
    code: `INSERT INTO preferences (user_id, theme, updated_at)
VALUES (:user_id, :theme, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
    theme = VALUES(theme),
    updated_at = CURRENT_TIMESTAMP;`,
  },
  {
    slug: "sql-jsonb-query",
    title: "Filter PostgreSQL JSONB Data",
    description: "Use JSONB containment and extraction operators for structured metadata.",
    language: "SQL",
    category: "PostgreSQL",
    code: `SELECT id, metadata->>'plan' AS plan
FROM accounts
WHERE metadata @> '{"region": "eu"}'::jsonb
  AND metadata->>'plan' = 'pro'
ORDER BY id
LIMIT 100;`,
  },
  {
    slug: "bash-parallel-xargs",
    title: "Run Bounded Parallel Jobs",
    description: "Use null-delimited paths and a fixed worker count for safe parallel processing.",
    language: "Bash",
    category: "Concurrency",
    code: `find ./images -type f -name '*.png' -print0 |
  xargs -0 -r -n 1 -P 4 sh -c '
    file="$1"
    printf "Processing %s\\n" "$file"
    identify "$file" >/dev/null
  ' sh`,
  },
  {
    slug: "bash-timestamped-log",
    title: "Write Timestamped Log Messages",
    description: "Send consistent timestamped diagnostics to stderr.",
    language: "Bash",
    category: "Logging",
    code: `log() {
  local level="$1"
  shift
  printf '[%s] %-5s %s\\n' "$(date -Is)" "$level" "$*" >&2
}

log INFO "Starting deployment"
log ERROR "Deployment failed"`,
  },
  {
    slug: "html-semantic-form",
    title: "Accessible Semantic Form",
    description: "Use explicit labels, autocomplete hints, and native input validation.",
    language: "HTML",
    category: "Forms",
    code: `<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    required
  />
  <button type="submit">Subscribe</button>
</form>`,
  },
  {
    slug: "html-responsive-picture",
    title: "Serve Responsive Images",
    description: "Offer modern image formats, responsive sizing, and useful alternative text.",
    language: "HTML",
    category: "Media",
    code: `<picture>
  <source
    type="image/avif"
    srcset="/team-640.avif 640w, /team-1280.avif 1280w"
    sizes="(max-width: 700px) 100vw, 700px"
  />
  <img
    src="/team-1280.jpg"
    alt="The product team collaborating"
    width="1280"
    height="720"
    loading="lazy"
  />
</picture>`,
  },
  {
    slug: "html-skip-link",
    title: "Add a Keyboard Skip Link",
    description: "Let keyboard users bypass repeated navigation and jump to main content.",
    language: "HTML",
    category: "Accessibility",
    code: `<a class="skip-link" href="#main">Skip to content</a>
<header>
  <nav aria-label="Primary navigation">...</nav>
</header>
<main id="main" tabindex="-1">
  <h1>Page title</h1>
</main>
<footer>...</footer>`,
  },
  {
    slug: "json-error-envelope",
    title: "Consistent API Error Envelope",
    description: "Return a stable machine-readable error shape with an optional request identifier.",
    language: "JSON",
    category: "API Design",
    code: `{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid fields.",
    "requestId": "req_01HT8W4B7K",
    "details": [
      { "field": "email", "issue": "must be a valid address" }
    ]
  }
}`,
  },
  {
    slug: "json-schema-config",
    title: "Validate Configuration with JSON Schema",
    description: "Require essential fields, constrain values, and reject unknown keys.",
    language: "JSON",
    category: "Validation",
    code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "additionalProperties": false,
  "required": ["host", "port"],
  "properties": {
    "host": { "type": "string", "minLength": 1 },
    "port": { "type": "integer", "minimum": 1, "maximum": 65535 }
  }
}`,
  },
  {
    slug: "json-feature-rollout",
    title: "Feature Rollout Configuration",
    description: "Keep feature rollout switches explicit and easy to audit.",
    language: "JSON",
    category: "Configuration",
    code: `{
  "features": {
    "new-dashboard": { "enabled": true, "rolloutPercent": 25 },
    "legacy-export": { "enabled": false, "rolloutPercent": 0 }
  }
}`,
  },
  {
    slug: "yaml-github-ci",
    title: "Reproducible Node CI Workflow",
    description: "Cache dependencies by lockfile and install with npm ci in automation.",
    language: "YAML",
    category: "CI/CD",
    code: `name: Test
on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test`,
  },
  {
    slug: "yaml-kubernetes-probes",
    title: "Kubernetes Health Probes",
    description: "Separate readiness and liveness checks for deployment health management.",
    language: "YAML",
    category: "Containers",
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  template:
    spec:
      containers:
        - name: web
          image: example/web:1.0.0
          readinessProbe:
            httpGet: { path: /ready, port: 8080 }
          livenessProbe:
            httpGet: { path: /health, port: 8080 }`,
  },
  {
    slug: "yaml-compose-healthcheck",
    title: "Compose Database Health Check",
    description: "Wait for the database health check before starting dependent services.",
    language: "YAML",
    category: "Containers",
    code: `services:
  database:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: local-dev-only
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 10
  app:
    build: .
    depends_on:
      database:
        condition: service_healthy`,
  },
  {
    slug: "xml-namespaced-feed",
    title: "Use XML Namespaces",
    description: "Qualify elements with namespaces to avoid ambiguous document vocabularies.",
    language: "XML",
    category: "Data Formats",
    code: `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="https://example.com/feed"
      xmlns:meta="https://example.com/meta">
  <entry>
    <title>Release notes</title>
    <meta:id>release-2026-01</meta:id>
    <meta:updated>2026-10-19T00:00:00Z</meta:updated>
  </entry>
</feed>`,
  },
  {
    slug: "xml-schema-required-fields",
    title: "Require XML Fields with XSD",
    description: "Constrain required elements and attributes with an XML schema.",
    language: "XML",
    category: "Validation",
    code: `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="user">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="email" type="xs:string" />
        <xs:element name="displayName" type="xs:string" />
      </xs:sequence>
      <xs:attribute name="id" type="xs:positiveInteger" use="required" />
    </xs:complexType>
  </xs:element>
</xs:schema>`,
  },
  {
    slug: "xml-accessible-svg",
    title: "Accessible SVG Graphic",
    description: "Give meaningful SVG graphics a title and description for assistive technology.",
    language: "XML",
    category: "Accessibility",
    code: `<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     role="img"
     aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Monthly growth</title>
  <desc id="chart-desc">A rising chart from January to June</desc>
  <path d="M3 18 9 12l4 3 8-9" fill="none" stroke="currentColor" />
</svg>`,
  },
  {
    slug: "markdown-readme-template",
    title: "Project README Structure",
    description: "Document purpose, requirements, setup, and verification steps consistently.",
    language: "Markdown",
    category: "Documentation",
    code: `# Project name

Short description of the problem this project solves.

## Requirements
- Node.js 22+

## Getting started
\`\`\`sh
npm ci
npm run dev
\`\`\`

## Testing
\`\`\`sh
npm test
\`\`\``,
  },
  {
    slug: "markdown-release-checklist",
    title: "Release Checklist",
    description: "Track repeatable release steps as a simple Markdown task list.",
    language: "Markdown",
    category: "Documentation",
    code: `## Release checklist

- [ ] Review open changes
- [ ] Run automated tests
- [ ] Update the changelog
- [ ] Verify migration and rollback steps
- [ ] Tag the release
- [ ] Confirm production health checks`,
  },
  {
    slug: "markdown-api-table",
    title: "Document API Fields",
    description: "Summarize field type, requirement, and meaning in a compact reference table.",
    language: "Markdown",
    category: "Documentation",
    code: `| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| \`id\` | string | Yes | Stable resource identifier |
| \`name\` | string | Yes | Display name |
| \`active\` | boolean | No | Whether the resource is enabled |`,
  },
  {
    slug: "graphql-cursor-pagination",
    title: "Cursor-Based GraphQL Pagination",
    description: "Request bounded pages and continue from the returned end cursor.",
    language: "GraphQL",
    category: "API Design",
    code: `query ListProjects($after: String, $first: Int = 20) {
  projects(after: $after, first: $first) {
    edges {
      cursor
      node { id name updatedAt }
    }
    pageInfo { hasNextPage endCursor }
  }
}`,
  },
  {
    slug: "graphql-mutation-input",
    title: "Group Mutation Arguments in an Input",
    description: "Keep mutation parameters together in a reusable input object.",
    language: "GraphQL",
    category: "API Design",
    code: `input CreateProjectInput {
  name: String!
  description: String
}

type Mutation {
  createProject(input: CreateProjectInput!): ProjectPayload!
}

type ProjectPayload {
  project: Project
  userErrors: [UserError!]!
}`,
  },
  {
    slug: "graphql-reusable-fragment",
    title: "Reuse a GraphQL Fragment",
    description: "Share a stable field selection between queries without duplicating it.",
    language: "GraphQL",
    category: "API Design",
    code: `fragment ProjectSummary on Project {
  id
  name
  updatedAt
}

query Dashboard {
  recentProjects(first: 5) {
    ...ProjectSummary
  }
}`,
  },
  {
    slug: "dockerfile-multistage-node",
    title: "Multi-Stage Node Runtime Image",
    description: "Keep build tooling out of production and run the app as a non-root user.",
    language: "Dockerfile",
    category: "Containers",
    code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]`,
  },
  {
    slug: "dockerfile-non-root",
    title: "Run a Container as Non-Root",
    description: "Create an unprivileged account and use it for the application process.",
    language: "Dockerfile",
    category: "Security",
    code: `FROM python:3.12-slim
WORKDIR /app
COPY --chown=app:app . .
RUN useradd --system --create-home app
USER app

CMD ["python", "-m", "http.server", "8080"]`,
  },
  {
    slug: "dockerfile-ignore-context",
    title: "Exclude Files from Docker Context",
    description: "Keep secrets, dependencies, and local output out of image build context.",
    language: "Dockerfile",
    category: "Security",
    code: `# .dockerignore
.git
.env
.env.*
node_modules
dist
coverage
*.pem
*.key
npm-debug.log*`,
  },
  {
    slug: "makefile-quality-target",
    title: "One Quality Target",
    description: "Make formatting, type checks, and tests discoverable through one command.",
    language: "Makefile",
    category: "Developer Tools",
    code: `.PHONY: quality format-check typecheck test

quality: format-check typecheck test

format-check:
	npm run format:check

typecheck:
	npm run typecheck

test:
	npm test`,
  },
  {
    slug: "makefile-configurable-dev",
    title: "Configurable Development Target",
    description: "Allow developers to override task values without editing the Makefile.",
    language: "Makefile",
    category: "Developer Tools",
    code: `APP ?= web
PORT ?= 8080

.PHONY: run
run:
	APP_NAME=$(APP) PORT=$(PORT) npm run dev

# Override: make run APP=docs PORT=9000`,
  },
  {
    slug: "makefile-self-documenting",
    title: "Self-Documenting Make Help",
    description: "Generate help text from comments attached to public Make targets.",
    language: "Makefile",
    category: "Documentation",
    code: `.PHONY: help test build

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \\
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  %-16s %s\\n", $$1, $$2}'

test: ## Run automated tests
	npm test`,
  },
  {
    slug: "elixir-with-validation",
    title: "Compose Validation with with",
    description: "Chain fallible operations and handle errors in one explicit branch.",
    language: "Elixir",
    category: "Validation",
    code: `def create_user(params) do
  with {:ok, email} <- validate_email(params["email"]),
       {:ok, name} <- validate_name(params["name"]),
       {:ok, user} <- Users.insert(%{email: email, name: name}) do
    {:ok, user}
  else
    {:error, reason} -> {:error, reason}
  end
end`,
  },
  {
    slug: "elixir-bounded-async-stream",
    title: "Process Items with Bounded Concurrency",
    description: "Use async_stream with a concurrency cap, timeout, and explicit exit handling.",
    language: "Elixir",
    category: "Concurrency",
    code: `results =
  urls
  |> Task.async_stream(&fetch/1,
    max_concurrency: 8,
    timeout: 5_000,
    on_timeout: :kill_task
  )
  |> Enum.map(fn
    {:ok, value} -> value
    {:exit, reason} -> {:error, reason}
  end)`,
  },
  {
    slug: "elixir-group-by",
    title: "Group Records by a Field",
    description: "Group a collection into a map keyed by a derived property.",
    language: "Elixir",
    category: "Data Transformation",
    code: `events_by_day = Enum.group_by(events, & &1.day)

monday_events = Map.get(events_by_day, :monday, [])

Enum.each(monday_events, fn event ->
  IO.puts(event.title)
end)`,
  },
  {
    slug: "haskell-parse-either",
    title: "Validate Input with Either",
    description: "Return a validation error or a typed value without throwing exceptions.",
    language: "Haskell",
    category: "Validation",
    code: `parsePort :: String -> Either String Int
parsePort input =
  case reads input of
    [(port, "")]
      | port >= 1 && port <= 65535 -> Right port
      | otherwise -> Left "port is out of range"
    _ -> Left "port must be an integer"`,
  },
  {
    slug: "haskell-parse-valid-values",
    title: "Keep Successfully Parsed Values",
    description: "Use mapMaybe to parse valid inputs while ignoring invalid ones intentionally.",
    language: "Haskell",
    category: "Data Transformation",
    code: `import Data.Maybe (mapMaybe)
import Text.Read (readMaybe)

parseIds :: [String] -> [Int]
parseIds = mapMaybe readMaybe

validIds = parseIds ["12", "invalid", "42"]`,
  },
  {
    slug: "haskell-bracket-cleanup",
    title: "Guarantee Resource Cleanup",
    description: "Use bracket to release a resource after success or an exception.",
    language: "Haskell",
    category: "Resource Management",
    code: `import Control.Exception (bracket)

withConfig :: FilePath -> (Handle -> IO a) -> IO a
withConfig path =
  bracket
    (openFile path ReadMode)
    hClose

-- The handle is closed after the action finishes.`,
  },
  {
    slug: "clojure-transformation-pipeline",
    title: "Transform Data with Thread-Last",
    description: "Express a data pipeline in the order each transformation is applied.",
    language: "Clojure",
    category: "Data Transformation",
    code: `(->> users
     (filter :active?)
     (map :email)
     (map clojure.string/lower-case)
     distinct
     sort)`,
  },
  {
    slug: "clojure-validate-map",
    title: "Validate Required Map Keys",
    description: "Check the input shape before passing a map into application logic.",
    language: "Clojure",
    category: "Validation",
    code: `(defn validate-user [input]
  (let [required #{:email :name}
        missing (remove #(contains? input %) required)]
    (if (seq missing)
      {:error {:missing (vec missing)}}
      {:ok (select-keys input required)})))

(validate-user {:email "dev@example.com" :name "Ada"})`,
  },
  {
    slug: "clojure-atom-update",
    title: "Update Shared State Atomically",
    description: "Use swap! to derive a new atom value from its current state.",
    language: "Clojure",
    category: "Concurrency",
    code: `(def metrics (atom {:requests 0 :errors 0}))

(defn record-request! [failed?]
  (swap! metrics
         (fn [current]
           (-> current
               (update :requests inc)
               (cond-> failed? (update :errors inc))))))

@metrics`,
  },
  {
    slug: "julia-dataframe-summary",
    title: "Summarize a DataFrame by Group",
    description: "Group tabular data and compute multiple summaries per group.",
    language: "Julia",
    category: "Analytics",
    code: `using DataFrames

summary = combine(
    groupby(orders, :customer_id),
    :total => sum => :revenue,
    nrow => :order_count,
)

sort!(summary, :revenue, rev=true)`,
  },
  {
    slug: "julia-explicit-missing",
    title: "Handle Missing Values Explicitly",
    description: "Use skipmissing and coalesce to make missing-data behavior intentional.",
    language: "Julia",
    category: "Data Quality",
    code: `values = Union{Missing, Float64}[2.0, missing, 5.0]

total = sum(skipmissing(values))
normalized = coalesce.(values, 0.0)

@show total normalized`,
  },
  {
    slug: "julia-parse-with-validation",
    title: "Parse a Bounded Integer",
    description: "Convert text to an integer and validate the accepted domain.",
    language: "Julia",
    category: "Validation",
    code: `function parse_port(value::AbstractString)
    port = tryparse(Int, value)
    isnothing(port) && return nothing
    1 <= port <= 65535 || return nothing
    return port
end

@assert parse_port("8080") == 8080
@assert isnothing(parse_port("0"))`,
  },
  {
    slug: "fsharp-result-validation",
    title: "Compose Validation with Result",
    description: "Represent expected validation failures as values, not exceptions.",
    language: "F#",
    category: "Validation",
    code: `let validateEmail (value: string) =
    if System.String.IsNullOrWhiteSpace(value) then
        Error "Email is required"
    elif not (value.Contains("@")) then
        Error "Email is invalid"
    else
        Ok (value.Trim().ToLowerInvariant())`,
  },
  {
    slug: "fsharp-group-records",
    title: "Group Records by a Field",
    description: "Group a list by a selected key and look up groups through a map.",
    language: "F#",
    category: "Data Transformation",
    code: `let tasksByProject =
    tasks
    |> List.groupBy (fun task -> task.Project)
    |> Map.ofList

let websiteTasks =
    Map.tryFind "website" tasksByProject
    |> Option.defaultValue []`,
  },
  {
    slug: "fsharp-domain-union",
    title: "Model Domain States with a Union",
    description: "Represent mutually exclusive states with a discriminated union.",
    language: "F#",
    category: "Data Modeling",
    code: `type PaymentStatus =
    | Pending of createdAt: System.DateTime
    | Paid of transactionId: string
    | Failed of reason: string

let describe = function
    | Pending _ -> "Awaiting payment"
    | Paid id -> $"Paid: {id}"
    | Failed reason -> $"Failed: {reason}"`,
  },
  {
    slug: "solidity-owner-access",
    title: "Minimal Owner Access Control",
    description: "Restrict a state-changing operation to the deploying account.",
    language: "Solidity",
    category: "Smart Contracts",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Controlled {
    address public immutable owner;
    error Unauthorized();

    constructor() { owner = msg.sender; }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }
}`,
  },
  {
    slug: "solidity-pull-payment",
    title: "Use a Pull-Payment Queue",
    description: "Let recipients claim funds themselves rather than making many external calls.",
    language: "Solidity",
    category: "Smart Contracts",
    code: `mapping(address => uint256) public pendingWithdrawals;

function claim() external {
    uint256 amount = pendingWithdrawals[msg.sender];
    require(amount > 0, "nothing to claim");
    pendingWithdrawals[msg.sender] = 0;

    (bool ok, ) = payable(msg.sender).call{value: amount}("");
    require(ok, "claim failed");
}`,
  },
  {
    slug: "solidity-custom-errors",
    title: "Use Typed Custom Errors",
    description: "Make contract failure paths explicit with compact custom errors.",
    language: "Solidity",
    category: "Smart Contracts",
    code: `error InvalidAmount(uint256 amount);
error InsufficientBalance(uint256 available, uint256 requested);

function transferAmount(address to, uint256 amount) external {
    if (amount == 0) revert InvalidAmount(amount);
    uint256 available = balanceOf[msg.sender];
    if (available < amount) {
        revert InsufficientBalance(available, amount);
    }
    _transfer(msg.sender, to, amount);
}`,
  },
  {
    slug: "groovy-json-response",
    title: "Serialize a Map as JSON",
    description: "Use the standard JSON encoder instead of manually concatenating JSON strings.",
    language: "Groovy",
    category: "Data Formats",
    code: `import groovy.json.JsonOutput

def response = [
    status: "ok",
    data: [count: 3, items: ["alpha", "beta"]]
]

String json = JsonOutput.prettyPrint(JsonOutput.toJson(response))
println json`,
  },
  {
    slug: "groovy-collection-grouping",
    title: "Group and Transform a Collection",
    description: "Group records by owner, then project each group's values.",
    language: "Groovy",
    category: "Data Transformation",
    code: `def titlesByOwner = tasks
    .groupBy { it.owner }
    .collectEntries { owner, items ->
        [owner, items.collect { it.title }.sort()]
    }

titlesByOwner.each { owner, titles ->
    println "\${owner}: \${titles.join(', ')}"
}`,
  },
  ...growthSnippets,
  {
    slug: "groovy-safe-process",
    title: "Run a Process Without a Shell",
    description: "Pass executable arguments separately to avoid shell quoting pitfalls.",
    language: "Groovy",
    category: "Developer Tools",
    code: `def process = new ProcessBuilder(
    "git", "status", "--short"
).redirectErrorStream(true).start()

def output = process.inputStream.getText("UTF-8")
int exitCode = process.waitFor()
if (exitCode != 0) throw new IllegalStateException(output)
println output`,
  },
];
