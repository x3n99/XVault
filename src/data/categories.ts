export const categories = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "Lua",
  "R",
  "Scala",
  "Perl",
  "PowerShell",
  "HTML",
  "JSON",
  "YAML",
  "XML",
  "Markdown",
  "GraphQL",
  "Dockerfile",
  "Makefile",
  "Elixir",
  "Haskell",
  "Clojure",
  "Julia",
  "F#",
  "Solidity",
  "Groovy",
  "PHP",
  "CSS",
  "SQL",
  "Bash",
] as const;

export type Language = (typeof categories)[number];

const languageConfig: Partial<
  Record<Language, { slug: string; shiki: string; extension: string }>
> = {
  "C++": { slug: "cpp", shiki: "cpp", extension: "cpp" },
  "C#": { slug: "csharp", shiki: "csharp", extension: "cs" },
  PowerShell: { slug: "powershell", shiki: "powershell", extension: "ps1" },
  HTML: { slug: "html", shiki: "html", extension: "html" },
  JSON: { slug: "json", shiki: "json", extension: "json" },
  YAML: { slug: "yaml", shiki: "yaml", extension: "yaml" },
  XML: { slug: "xml", shiki: "xml", extension: "xml" },
  Markdown: { slug: "markdown", shiki: "markdown", extension: "md" },
  GraphQL: { slug: "graphql", shiki: "graphql", extension: "graphql" },
  Dockerfile: { slug: "dockerfile", shiki: "dockerfile", extension: "dockerfile" },
  Makefile: { slug: "makefile", shiki: "makefile", extension: "mk" },
  Elixir: { slug: "elixir", shiki: "elixir", extension: "ex" },
  Haskell: { slug: "haskell", shiki: "haskell", extension: "hs" },
  Clojure: { slug: "clojure", shiki: "clojure", extension: "clj" },
  Julia: { slug: "julia", shiki: "julia", extension: "jl" },
  "F#": { slug: "fsharp", shiki: "fsharp", extension: "fs" },
  Solidity: { slug: "solidity", shiki: "solidity", extension: "sol" },
  Groovy: { slug: "groovy", shiki: "groovy", extension: "groovy" },
  Bash: { slug: "bash", shiki: "bash", extension: "sh" },
  JavaScript: { slug: "javascript", shiki: "javascript", extension: "js" },
  TypeScript: { slug: "typescript", shiki: "typescript", extension: "ts" },
  Python: { slug: "python", shiki: "python", extension: "py" },
  Java: { slug: "java", shiki: "java", extension: "java" },
  C: { slug: "c", shiki: "c", extension: "c" },
  Go: { slug: "go", shiki: "go", extension: "go" },
  Rust: { slug: "rust", shiki: "rust", extension: "rs" },
  Ruby: { slug: "ruby", shiki: "ruby", extension: "rb" },
  Swift: { slug: "swift", shiki: "swift", extension: "swift" },
  Kotlin: { slug: "kotlin", shiki: "kotlin", extension: "kt" },
  Dart: { slug: "dart", shiki: "dart", extension: "dart" },
  Lua: { slug: "lua", shiki: "lua", extension: "lua" },
  R: { slug: "r", shiki: "r", extension: "r" },
  Scala: { slug: "scala", shiki: "scala", extension: "scala" },
  Perl: { slug: "perl", shiki: "perl", extension: "pl" },
  PHP: { slug: "php", shiki: "php", extension: "php" },
  CSS: { slug: "css", shiki: "css", extension: "css" },
  SQL: { slug: "sql", shiki: "sql", extension: "sql" },
};

function findLanguage(language: string): Language | undefined {
  const normalized = language.toLowerCase();
  return categories.find(
    (item) =>
      item !== "All" &&
      (item.toLowerCase() === normalized ||
        languageConfig[item]?.slug === normalized),
  );
}

export function getLanguageSlug(language: string): string {
  const match = findLanguage(language);
  return (match && languageConfig[match]?.slug) ?? language.toLowerCase();
}

export function getShikiLanguage(language: string): string {
  const match = findLanguage(language);
  return (match && languageConfig[match]?.shiki) ?? language.toLowerCase();
}

export function getLanguageExtension(language: string): string {
  const match = findLanguage(language);
  return (match && languageConfig[match]?.extension) ?? "txt";
}