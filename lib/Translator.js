import { getTranslations, getLocale } from 'next-intl/server'
export async function getTranslator(key) {
    const locale = await getLocale()
    const t = await getTranslations({ locale, namespace: key })
    return { t, locale }
}