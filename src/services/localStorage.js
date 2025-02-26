// Set a value in localStorage
export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get a value from localStorage
export function getItem(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// Remove a value from localStorage
export function removeItem(key) {
  localStorage.removeItem(key);
}

// Clear all values from localStorage
export function clearStorage() {
  localStorage.clear();
}

// Example specific function for user preferences
export function setThemePreference(theme) {
  setItem("theme", theme);
}

export function getThemePreference() {
  return getItem("theme") || "default";
}
