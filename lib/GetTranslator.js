// lib/fetchTranslator.js
import { getTranslator } from "@/lib/Translator";

export async function fetchTranslator(locale) {
  const { t } = await getTranslator(locale);
  return t;
}
