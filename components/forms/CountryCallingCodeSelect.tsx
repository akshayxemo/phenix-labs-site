'use client'

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js/min'

interface CountryCallingCodeSelectProps {
  value: CountryCode
  onChange: (country: CountryCode) => void
  disabled?: boolean
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const countryOptions = getCountries()
  .map((country) => ({
    country,
    name: regionNames.of(country) || country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((first, second) => first.name.localeCompare(second.name))

function countryFlag(country: CountryCode) {
  return country
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    )
}

export function getCountryDisplayName(country: CountryCode) {
  return regionNames.of(country) || country
}

/** Search-engine-independent country calling-code picker backed by phone metadata. */
export function CountryCallingCodeSelect({
  value,
  onChange,
  disabled = false,
}: CountryCallingCodeSelectProps) {
  const selectedCallingCode = getCountryCallingCode(value)

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative shrink-0">
        <ListboxButton
          aria-label={`Country: ${getCountryDisplayName(value)}, calling code +${selectedCallingCode}`}
          className="flex h-full min-h-13 items-center gap-2 rounded-l-[13px] border-r border-[#c9d5df] bg-[#eef4f8] px-3.5 text-sm font-semibold text-[#26384a] outline-none transition-colors hover:bg-[#e7f0f6] focus-visible:bg-[#e7f0f6] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[112px]"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {countryFlag(value)}
          </span>
          <span className="tabular-nums">+{selectedCallingCode}</span>
          <ChevronDown aria-hidden="true" size={15} className="ml-auto text-[#738496]" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute left-0 top-[calc(100%+8px)] z-[80] max-h-72 w-[min(340px,calc(100vw-3rem))] overflow-y-auto rounded-[16px] border border-[#c7d5df] bg-[#f9fbfc] p-1.5 shadow-[0_22px_60px_rgba(16,35,55,0.2)] outline-none transition duration-150 data-closed:-translate-y-1 data-closed:opacity-0"
        >
          {countryOptions.map((option) => (
            <ListboxOption
              key={option.country}
              value={option.country}
              className="group flex cursor-pointer items-center gap-3 rounded-[11px] px-3 py-2.5 text-sm text-[#34475a] outline-none data-focus:bg-[#e7f2ff] data-selected:text-[#075da9]"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {countryFlag(option.country)}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{option.name}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-[#738496]">
                +{option.callingCode}
              </span>
              <Check
                aria-hidden="true"
                size={15}
                className="shrink-0 opacity-0 group-data-selected:opacity-100"
              />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
