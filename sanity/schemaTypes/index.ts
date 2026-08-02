import { aboutPageType } from './aboutPage'
import { clientType } from './clients'
import { contactSettingsType } from './contactSettings'
import { inventionType } from './inventions'
import { productsType } from './products'
import { serviceType } from './services'
import { testimonialType } from './testimonials'

/** Complete Studio schema registry. Keep retained future-facing types listed here. */
export const schemaTypes = [
  aboutPageType,
  contactSettingsType,
  clientType,
  inventionType,
  productsType,
  serviceType,
  testimonialType,
]
