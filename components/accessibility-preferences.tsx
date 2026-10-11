"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  applyAccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  isAdminPathname,
  readAccessibilityPreferences,
  saveAccessibilityPreferences,
  type AccessibilityPreferences,
  type AccessibilityTextSize,
} from "@/lib/accessibility-preferences";

const AccessibilityDialogContext = createContext<
  ((trigger: HTMLButtonElement) => void) | null
>(null);

const textSizeOptions: { value: AccessibilityTextSize; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "large", label: "Large" },
  { value: "extra-large", label: "Extra large" },
];

const storageUnavailableMessage =
  "Preferences apply for this visit. Your browser is not allowing them to be saved.";

export function AccessibilityPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const preferencesRef = useRef<AccessibilityPreferences>(
    DEFAULT_ACCESSIBILITY_PREFERENCES,
  );
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(
    DEFAULT_ACCESSIBILITY_PREFERENCES,
  );
  const [status, setStatus] = useState("");
  const isAdminRoute = isAdminPathname(pathname);

  useLayoutEffect(() => {
    const stored = readAccessibilityPreferences();

    if (stored.storageAvailable) {
      preferencesRef.current = stored.preferences;
    }

    applyAccessibilityPreferences(
      preferencesRef.current,
      document.documentElement,
      pathname,
    );

    // A modal from the previous public route must not stay open after navigation.
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  const openDialog = useCallback((trigger: HTMLButtonElement) => {
    const dialog = dialogRef.current;

    if (!dialog || isAdminPathname(window.location.pathname)) return;

    const stored = readAccessibilityPreferences();

    if (stored.storageAvailable) {
      preferencesRef.current = stored.preferences;
    }

    setPreferences(preferencesRef.current);
    setStatus(
      stored.storageAvailable
        ? "Preferences are saved automatically on this device."
        : storageUnavailableMessage,
    );
    triggerRef.current = trigger;

    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  function updatePreferences(next: AccessibilityPreferences, reset = false) {
    preferencesRef.current = next;
    setPreferences(next);
    applyAccessibilityPreferences(
      next,
      document.documentElement,
      window.location.pathname,
    );

    const saved = saveAccessibilityPreferences(next);
    setStatus(
      saved
        ? reset
          ? "Accessibility preferences reset."
          : "Preferences saved on this device."
        : reset
          ? `Accessibility preferences reset. ${storageUnavailableMessage}`
          : storageUnavailableMessage,
    );
  }

  function restoreTriggerFocus() {
    const trigger = triggerRef.current;

    if (trigger?.isConnected && trigger.getClientRects().length > 0) {
      trigger.focus({ preventScroll: true });
    }

    triggerRef.current = null;
  }

  if (isAdminRoute) return children;

  return (
    <AccessibilityDialogContext.Provider value={openDialog}>
      {children}
      <dialog
        ref={dialogRef}
        id="accessibility-preferences"
        className="a11y-dialog"
        aria-labelledby="accessibility-preferences-title"
        aria-describedby="accessibility-preferences-description"
        onCancel={(event) => {
          event.preventDefault();
          dialogRef.current?.close();
        }}
        onClose={restoreTriggerFocus}
      >
        <div className="a11y-panel">
          <div className="a11y-heading">
            <h2 id="accessibility-preferences-title">
              Accessibility preferences
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="a11y-close"
              onClick={() => dialogRef.current?.close()}
            >
              <span>Close</span>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                width="20"
                height="20"
              >
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </div>
          <p
            id="accessibility-preferences-description"
            className="a11y-intro"
          >
            Adjust how Rawal One is displayed on this device.
          </p>
          <form
            className="a11y-controls"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset className="a11y-fieldset">
              <legend>Text size</legend>
              <div className="a11y-text-options">
                {textSizeOptions.map(({ value, label }) => (
                  <label key={value} className="a11y-text-option">
                    <input
                      type="radio"
                      name="accessibility-text-size"
                      value={value}
                      checked={preferences.textSize === value}
                      onChange={() =>
                        updatePreferences({ ...preferences, textSize: value })
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="a11y-toggle">
              <input
                type="checkbox"
                checked={preferences.highContrast}
                onChange={(event) =>
                  updatePreferences({
                    ...preferences,
                    highContrast: event.currentTarget.checked,
                  })
                }
              />
              <span className="a11y-toggle-copy">
                <strong>High contrast</strong>
                <small>Strengthen text, borders and focus indicators.</small>
              </span>
            </label>
            <label className="a11y-toggle">
              <input
                type="checkbox"
                checked={preferences.underlineLinks}
                onChange={(event) =>
                  updatePreferences({
                    ...preferences,
                    underlineLinks: event.currentTarget.checked,
                  })
                }
              />
              <span className="a11y-toggle-copy">
                <strong>Underline links</strong>
                <small>Keep text links underlined while reading.</small>
              </span>
            </label>
            <label className="a11y-toggle">
              <input
                type="checkbox"
                checked={preferences.reduceMotion}
                onChange={(event) =>
                  updatePreferences({
                    ...preferences,
                    reduceMotion: event.currentTarget.checked,
                  })
                }
              />
              <span className="a11y-toggle-copy">
                <strong>Reduce motion</strong>
                <small>Minimize non-essential interaction animation.</small>
              </span>
            </label>
            <div className="a11y-actions">
              <button
                type="button"
                className="a11y-reset"
                onClick={() =>
                  updatePreferences(
                    { ...DEFAULT_ACCESSIBILITY_PREFERENCES },
                    true,
                  )
                }
              >
                Reset accessibility preferences
              </button>
              <p className="a11y-status" role="status" aria-atomic="true">
                {status}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </AccessibilityDialogContext.Provider>
  );
}

export function AccessibilityPreferencesButton({
  className,
}: {
  className?: string;
}) {
  const openDialog = useContext(AccessibilityDialogContext);

  if (!openDialog) return null;

  return (
    <button
      type="button"
      className={["a11y-trigger", className].filter(Boolean).join(" ")}
      aria-haspopup="dialog"
      aria-controls="accessibility-preferences"
      onClick={(event) => openDialog(event.currentTarget)}
    >
      Accessibility
    </button>
  );
}
