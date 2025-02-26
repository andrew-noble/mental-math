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

export function getAllItems() {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    items.push({ key, value });
  }
  return items;
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
