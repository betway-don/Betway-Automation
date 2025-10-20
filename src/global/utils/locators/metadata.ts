import { LocatorMetadata } from './types';
import { LocatorConfig } from '../file-utils/excelReader';

function formatLocatorConfigAsContext(config: LocatorConfig): string {
  const parts: string[] = [];
  
  // For role type, format it differently
  if (config.type === 'role') {
    parts.push(`getByRole('${config.value}'`);
    if (config.options && Object.keys(config.options).length > 0) {
      const options = JSON.stringify(config.options);
      parts.push(`, ${options}`);
    }
    parts.push(')');
    if (config.nth !== undefined) {
      parts.push(`.nth(${config.nth})`);
    }
  } else {
    // For other types
    parts.push(`${config.type}:${config.value}`);
    if (config.options && Object.keys(config.options).length > 0) {
      Object.entries(config.options).forEach(([key, value]) => {
        parts.push(`${key}:${value}`);
      });
    }
    if (config.nth !== undefined) {
      parts.push(`nth:${config.nth}`);
    }
  }
  
  return parts.join(' ');
}

export const locatorMetadataMap: Record<string, LocatorMetadata> = {};

export function updateLocatorMetadata(key: string, config: LocatorConfig) {
  const formattedContext = formatLocatorConfigAsContext(config);
  
  if (!locatorMetadataMap[key]) {
    locatorMetadataMap[key] = {
      description: 'Generated from Excel config',
      context: formattedContext,
      lastUpdated: new Date().toISOString()
    };
  } else {
    locatorMetadataMap[key] = {
      ...locatorMetadataMap[key],
      context: formattedContext,
      lastUpdated: new Date().toISOString()
    };
  }
}

export function getLocatorMetadata(key: string): LocatorMetadata {
  return locatorMetadataMap[key] || {
    description: `Dynamic element with key "${key}"`,
    context: 'No specific context provided',
    lastUpdated: new Date().toISOString()
  };
}