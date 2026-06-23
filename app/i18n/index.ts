import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

export type Locale = "en" | "es";

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return (locale === "es" ? es : en) as Dictionary;
}
