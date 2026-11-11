type DialogVariant = "success" | "error" | "warning" | "confirm";

interface DialogOptions {
  title: string;
  message: string;
  variant?: DialogVariant;
  confirmText?: string;
  cancelText?: string;
}

export function showAppDialog(options: DialogOptions): Promise<boolean> {
  const dialog = document.querySelector<HTMLDialogElement>("#app-dialog");
  const icon = document.querySelector<HTMLElement>("#app-dialog-icon");
  const title = document.querySelector<HTMLElement>("#app-dialog-title");
  const message = document.querySelector<HTMLElement>("#app-dialog-message");
  const confirmButton = document.querySelector<HTMLButtonElement>(
    "#app-dialog-confirm",
  );
  const cancelButton =
    document.querySelector<HTMLButtonElement>("#app-dialog-cancel");

  if (!dialog || !icon || !title || !message || !confirmButton || !cancelButton) {
    console.error("App dialog elements are missing from the layout.");
    return Promise.resolve(false);
  }

  if (dialog.open) {
    console.error("App dialog is already open.");
    return Promise.resolve(false);
  }

  const variant = options.variant ?? "success";
  const isConfirm = variant === "confirm" || variant === "warning";
  let settled = false;

  title.textContent = options.title;
  message.textContent = options.message;
  icon.textContent =
    variant === "success"
      ? "✓"
      : variant === "error"
        ? "!"
        : variant === "warning"
          ? "!"
          : "?";

  icon.classList.toggle("is-danger", variant === "error" || isConfirm);
  confirmButton.classList.toggle("is-danger", isConfirm);
  confirmButton.textContent =
    options.confirmText ?? (isConfirm ? "Continue" : "OK");
  cancelButton.textContent = options.cancelText ?? "Cancel";
  cancelButton.hidden = !isConfirm;

  return new Promise<boolean>((resolve) => {
    const finish = (result: boolean) => {
      if (settled) return;
      settled = true;

      dialog.removeEventListener("close", handleClose);
      confirmButton.removeEventListener("click", handleConfirm);
      cancelButton.removeEventListener("click", handleCancel);

      if (dialog.open) dialog.close();
      resolve(result);
    };

    const handleConfirm = () => finish(true);
    const handleCancel = () => finish(false);
    const handleClose = () => finish(false);

    confirmButton.addEventListener("click", handleConfirm);
    cancelButton.addEventListener("click", handleCancel);
    dialog.addEventListener("close", handleClose);

    dialog.showModal();
    confirmButton.focus();
  });
}

export function showAlert(
  message: string,
  variant: "success" | "error" | "warning" = "success",
  title?: string,
): Promise<boolean> {
  const defaultTitles = {
    success: "All done",
    error: "Something went wrong",
    warning: "Notice",
  };

  return showAppDialog({
    title: title ?? defaultTitles[variant],
    message,
    variant,
  });
}

export function showConfirm(
  message: string,
  title = "Are you sure?",
): Promise<boolean> {
  return showAppDialog({
    title,
    message,
    variant: "confirm",
    confirmText: "Continue",
    cancelText: "Cancel",
  });
}

export function showToast(
  message: string,
  variant: "success" | "error" = "success",
): void {
  const container = document.querySelector<HTMLElement>("#toast-container");
  if (!container) {
    console.error("Toast container is missing from the layout.");
    return;
  }

  const toast = document.createElement("div");
  toast.className = `app-toast${variant === "error" ? " is-error" : ""}`;
  toast.setAttribute("role", variant === "error" ? "alert" : "status");

  const icon = document.createElement("span");
  icon.className = "app-toast-icon";
  icon.textContent = variant === "error" ? "!" : "✓";
  icon.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.textContent = message;

  toast.append(icon, text);
  container.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("is-dismissed");
    window.setTimeout(() => toast.remove(), 180);
  }, 2800);
}
