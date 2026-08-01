'use client'

import { useCallback, useId, useMemo, useState } from 'react'
import { Autocomplete, Flex, Text } from '@sanity/ui'
import {
  DynamicIcon,
  iconNames,
  type IconName,
} from 'lucide-react/dynamic'
import { set, type StringInputProps } from 'sanity'

interface IconOption {
  value: IconName
  title: string
}

const recommendedIconNames = [
  'circuit-board',
  'cpu',
  'microchip',
  'code-xml',
  'terminal',
  'bot',
  'brain-circuit',
  'blocks',
  'boxes',
  'box',
  'palette',
  'pen-tool',
  'drafting-compass',
  'ruler',
  'wrench',
  'hammer',
  'settings',
  'gauge',
  'chart-no-axes-combined',
  'workflow',
  'network',
  'radio-tower',
  'satellite-dish',
  'graduation-cap',
  'book-open',
  'lightbulb',
  'rocket',
  'flask-conical',
].filter((name): name is IconName => iconNames.includes(name as IconName))

function formatIconName(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function toOption(name: IconName): IconOption {
  return { value: name, title: formatIconName(name) }
}

export function ServiceIconInput(props: StringInputProps) {
  const { onChange, readOnly, validationError, value } = props
  const inputId = useId()
  const [query, setQuery] = useState<string | null>(null)
  const selectedName = iconNames.includes(value as IconName)
    ? (value as IconName)
    : 'boxes'

  const options = useMemo(() => {
    const normalizedQuery = query?.trim().toLowerCase() ?? ''
    const names = normalizedQuery
      ? iconNames
          .filter((name) => name.includes(normalizedQuery.replaceAll(' ', '-')))
          .slice(0, 100)
      : [...recommendedIconNames]

    if (!names.includes(selectedName)) names.unshift(selectedName)
    return names.map(toOption)
  }, [query, selectedName])

  const handleSelect = useCallback(
    (icon: string) => {
      onChange(set(icon))
    },
    [onChange],
  )

  return (
    <Autocomplete<IconOption>
      customValidity={validationError}
      disabled={readOnly}
      filterOption={() => true}
      fontSize={2}
      id={`service-icon-${inputId}`}
      onQueryChange={setQuery}
      onSelect={handleSelect}
      openButton
      openOnFocus
      options={options}
      padding={3}
      placeholder="Search all Lucide icons…"
      popover={{ placement: 'bottom-start', portal: true }}
      prefix={<DynamicIcon name={selectedName} size={20} />}
      renderOption={(option) => (
        <Flex align="center" gap={3} padding={2}>
          <DynamicIcon name={option.value} size={20} />
          <Text size={1}>{option.title}</Text>
        </Flex>
      )}
      renderValue={(icon, option) => option?.title ?? formatIconName(icon)}
      value={value ?? ''}
    />
  )
}
