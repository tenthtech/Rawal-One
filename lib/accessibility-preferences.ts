export type AccessibilityTextSize = "default" | "large" | "extra-large";

export type AccessibilityPreferences = {
  textSize: AccessibilityTextSize;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
};

export const ACCESSIBILITY_STORAGE_KEY = "rawal-one-accessibility-v1";

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  textSize: "default",
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
};

export function isAdminPathname(pathname: string): boolean {
  return /^\/admin(?:\/|$)/.test(pathname);
}

/** Only known values are copied from browser storage. */
export function validateAccessibilityPreferences(
  value: unknown,
): AccessibilityPreferences {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
  }

  const candidate = value as Record<string, unknown>;

  return {
    textSize:
      candidate.textSize === "large" || candidate.textSize === "extra-large"
        ? candidate.textSize
        : "default",
    highContrast: candidate.highContrast === true,
    underlineLinks: candidate.underlineLinks === true,
    reduceMotion: candidate.reduceMotion === true,
  };
}

export function readAccessibilityPreferences(): {
  preferences: AccessibilityPreferences;
  storageAvailable: boolean;
} {
  if (typeof window === "undefined") {
    return {
      preferences: { ...DEFAULT_ACCESSIBILITY_PREFERENCES },
      storageAvailable: false,
    };
  }

  try {
    const stored = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);

    if (stored === null) {
      return {
        preferences: { ...DEFAULT_ACCESSIBILITY_PREFERENCES },
        storageAvailable: true,
      };
    }

    let value: unknown;

    try {
      value = JSON.parse(stored);
    } catch {
      value = null;
    }

    return {
      preferences: validateAccessibilityPreferences(value),
      storageAvailable: true,
    };
  } catch {
    return {
      preferences: { ...DEFAULT_ACCESSIBILITY_PREFERENCES },
      storageAvailable: false,
    };
  }
}

export function saveAccessibilityPreferences(
  preferences: AccessibilityPreferences,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      JSON.stringify(validateAccessibilityPreferences(preferences)),
    );
    return true;
  } catch {
    return false;
  }
}

export function applyAccessibilityPreferences(
  preferences: AccessibilityPreferences,
  root: HTMLElement,
  pathname: string,
): void {
  if (isAdminPathname(pathname)) {
    root.dataset.site = "admin";
    root.removeAttribute("data-a11y-text");
    root.removeAttribute("data-a11y-contrast");
    root.removeAttribute("data-a11y-links");
    root.removeAttribute("data-a11y-motion");
    return;
  }

  const safe = validateAccessibilityPreferences(preferences);
  root.dataset.site = "public";
  root.dataset.a11yText = safe.textSize;
  root.dataset.a11yContrast = String(safe.highContrast);
  root.dataset.a11yLinks = String(safe.underlineLinks);
  root.dataset.a11yMotion = String(safe.reduceMotion);
}

// Static application-owned code: stored values are validated, never evaluated or
// interpolated into this script. Keep its allowlist in sync with the helpers.
export const ACCESSIBILITY_PREFERENCES_SCRIPT = `(function(){
  var root=document.documentElement;
  if(/^\\/admin(?:\\/|$)/.test(window.location.pathname)){
    root.setAttribute('data-site','admin');
    root.removeAttribute('data-a11y-text');
    root.removeAttribute('data-a11y-contrast');
    root.removeAttribute('data-a11y-links');
    root.removeAttribute('data-a11y-motion');
    return;
  }
  root.setAttribute('data-site','public');
  var value=null;
  try{value=JSON.parse(window.localStorage.getItem('rawal-one-accessibility-v1'));}catch(error){}
  if(!value||typeof value!=='object'||Array.isArray(value)){value={};}
  var text=value.textSize==='large'||value.textSize==='extra-large'?value.textSize:'default';
  root.setAttribute('data-a11y-text',text);
  root.setAttribute('data-a11y-contrast',value.highContrast===true?'true':'false');
  root.setAttribute('data-a11y-links',value.underlineLinks===true?'true':'false');
  root.setAttribute('data-a11y-motion',value.reduceMotion===true?'true':'false');
})();`;
