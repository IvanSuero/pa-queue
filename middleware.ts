import createMiddleware from 'next-intl/middleware'
import { locales, pathnames, defaultLocale } from './navigation'

export default createMiddleware({
    defaultLocale,
    pathnames,
    locales
})

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!_next|.*\\..*).*)']
}