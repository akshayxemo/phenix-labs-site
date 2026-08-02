'use client'

import { useState } from 'react'
import { useToast } from '@sanity/ui'
import { RotateCcw } from 'lucide-react'
import {
  useClient,
  type DocumentActionComponent,
} from 'sanity'
import { DEFAULT_CONTACT_SETTINGS } from '@/config/contact'
import { apiVersion } from '@/sanity/env'

const singletonLabels: Record<string, string> = {
  aboutPage: 'About page',
  contactSettings: 'contact settings',
}

function getInitialContent(type: string): Record<string, unknown> {
  // Singleton defaults make recovery possible after an editor deletes the document.
  if (type === 'aboutPage') {
    return { markdown: '' }
  }

  return {
    phone: DEFAULT_CONTACT_SETTINGS.phone,
    email: DEFAULT_CONTACT_SETTINGS.email,
    hours: DEFAULT_CONTACT_SETTINGS.hours,
    responseTime: DEFAULT_CONTACT_SETTINGS.responseTime,
    address: DEFAULT_CONTACT_SETTINGS.address,
    socialLinks: DEFAULT_CONTACT_SETTINGS.socialLinks.map((link) => ({
      _type: 'socialLink',
      _key: link.id,
      platform: link.platform,
      url: link.href,
      isVisible: true,
    })),
  }
}

/** Studio action that recreates supported singleton documents at their canonical ids. */
export const RecreateSingletonAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const toast = useToast()
  const [isRecreating, setIsRecreating] = useState(false)
  const label = singletonLabels[props.type]

  if (!label || !props.ready || props.draft || props.published) return null

  return {
    label: isRecreating ? `Recreating ${label}…` : `Recreate ${label}`,
    icon: RotateCcw,
    disabled: isRecreating,
    onHandle: async () => {
      setIsRecreating(true)

      try {
        const documentId = props.id.replace(/^drafts\./, '')

        await client.createIfNotExists<Record<string, unknown>>({
          _id: documentId,
          _type: props.type,
          ...getInitialContent(props.type),
        })

        toast.push({
          status: 'success',
          title: `${label.charAt(0).toUpperCase()}${label.slice(1)} recreated`,
          description: 'You can now edit and publish the singleton normally.',
        })
        props.onComplete()
      } catch (error) {
        toast.push({
          status: 'error',
          title: `Could not recreate ${label}`,
          description:
            error instanceof Error ? error.message : 'Please try again.',
        })
      } finally {
        setIsRecreating(false)
      }
    },
  }
}

RecreateSingletonAction.displayName = 'RecreateSingletonAction'
