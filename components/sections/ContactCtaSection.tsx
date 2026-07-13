import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'

interface ContactCtaSectionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function ContactCtaSection({
  title,
  description,
  buttonText,
  buttonLink,
}: ContactCtaSectionProps) {
  return (
    <Section className="bg-slate-900 text-white py-16 md:py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
            {/* Contact Info */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-sm text-gray-400">Contact</p>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-sm text-gray-400">Working Hours</p>
                  <p className="font-semibold">Monday-Friday 9:00 - 17:00</p>
                </div>
              </div>
            </div>

            {/* Form Area */}
            <div className="w-full md:w-auto flex-shrink-0">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full md:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">📍</span>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-sm font-semibold">123 Tech Street, SF, CA</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">🔒</span>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Security</p>
                  <p className="text-sm font-semibold">Enterprise Grade</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">in</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">© 2024 phenixlabs.ai. All rights reserved</p>
        </div>
      </Container>
    </Section>
  )
}
