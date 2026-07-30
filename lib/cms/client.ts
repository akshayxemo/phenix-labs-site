/**
 * CMS Client Factory
 * 
 * Creates the appropriate client based on configuration
 * Switch between mock and Sanity seamlessly
 */

import { isSanityEnabled } from './config'
import * as mockData from '@/lib/data/mock'
import {
  getFooterData as getSiteFooterData,
  getNavbarData as getSiteNavbarData,
} from '@/lib/config/site'

/**
 * Data provider interface
 * All CMS clients must implement this interface
 */
export interface IDataProvider {
  getHomePage: typeof mockData.getHomePage
  getServicesPage: typeof mockData.getServicesPage
  getAboutPage: typeof mockData.getAboutPage
  getCasesPage: typeof mockData.getCasesPage
}

/**
 * Factory function to create the appropriate data provider
 */
function createDataProvider(): IDataProvider {
  if (isSanityEnabled()) {
    console.log('[CMS] Using Sanity provider')
    // TODO: Implement Sanity provider
    // return new SanityDataProvider()
    
    // Fallback to mock for now
    return mockData as unknown as IDataProvider
  }

  console.log('[CMS] Using mock data provider')
  return mockData as unknown as IDataProvider
}

/**
 * Singleton instance of the data provider
 */
export const dataProvider = createDataProvider()

/**
 * Export convenience functions
 */
export const getNavbarData = getSiteNavbarData
export const getFooterData = getSiteFooterData
export const getHomePage = () => dataProvider.getHomePage()
export const getServicesPage = () => dataProvider.getServicesPage()
export const getAboutPage = () => dataProvider.getAboutPage()
export const getCasesPage = () => dataProvider.getCasesPage()
