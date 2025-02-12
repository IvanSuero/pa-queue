import {
  createLocalizedPathnamesNavigation,
} from 'next-intl/navigation'

export const defaultLocale = 'en'

export const locales = ['en', 'es']

export const pathnames = {
  '/': '/'
}

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
      locales,
      pathnames
  })