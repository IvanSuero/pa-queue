import LangElement from './Element'
import { locales } from '@/navigation'
import { getTranslator } from '@/lib/Translator'

async function LangList({ mobile }) {

    const { t, locale } = await getTranslator('home')
    return locales.map((lng) => <LangElement key={lng} langName={t(lng)} locale={lng} selected={locale} />)
}

export default LangList