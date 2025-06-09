import yaml from 'js-yaml';
import type { PageConfig } from '@/types/config';

export function loadYamlSafely<T>(yamlContent: string): T {
  try {
    // Use load to prevent code execution
    const data = yaml.load(yamlContent, {
      schema: yaml.DEFAULT_SCHEMA,
      json: true
    });

    if (!data) {
      throw new Error('YAML file is empty');
    }

    return data as T;
  } catch (error) {
    console.error('❌ YAML parsing error:', error);
    // Return a type-safe empty object as fallback
    return {} as T;
  }
}

export function validateYamlStructure(data: unknown): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Add any specific validation logic here
  // For example, checking required fields
  const requiredTopLevelKeys = ['countries', 'seo', 'global'];
  for (const key of requiredTopLevelKeys) {
    if (!(key in data)) {
      console.error(`❌ Missing required key: ${key}`);
      return false;
    }
  }

  return true;
}

const DEFAULT_CONFIG: PageConfig = {
  countries: {},
  seo: { 
    global: { 
      defaults: {
        title_suffix: ' | CleanCraft',
        keywords_base: ['professional cleaning', 'garment care'],
        image: '/lovable-uploads/cleancraft-full-logo.png'
      }
    }, 
    pages: {} 
  },
  global: { pages: [] }
};

export async function loadYamlFile<T>(filePath: string): Promise<T> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load YAML file: ${response.statusText}`);
    }

    const yamlContent = await response.text();
    const data = loadYamlSafely<T>(yamlContent);

    if (!validateYamlStructure(data)) {
      console.warn('❌ Invalid YAML structure, using default config');
      return DEFAULT_CONFIG as unknown as T;
    }

    return data;
  } catch (error) {
    console.error(`❌ Failed to load YAML file ${filePath}:`, error);
    return DEFAULT_CONFIG as unknown as T;
  }
} 