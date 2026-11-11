document.addEventListener("keydown", (event) => {
  const searchInput =
    document.querySelector<HTMLInputElement>("#global-search");

  const isSearchShortcut =
    (event.key === "k" || event.key === "K") &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey;

  const isSlashShortcut =
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey;

  const isEscapeShortcut = event.key === "Escape";

  const target = event.target;

  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable);

  if (isEscapeShortcut) {
    if (
      window.location.pathname === "/search" &&
      searchInput &&
      document.activeElement === searchInput
    ) {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      searchInput.blur();
    }

    return;
  }

  if (!isSearchShortcut && !isSlashShortcut) return;
  if (isTyping && !isSearchShortcut) return;

  event.preventDefault();

  if (window.location.pathname !== "/search") {
    window.location.href = "/search";
    return;
  }

  searchInput?.focus();
});