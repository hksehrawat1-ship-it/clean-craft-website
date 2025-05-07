
import { supabase } from "@/integrations/supabase/client";

const BUCKET_NAME = 'website-assets';

/**
 * Get a public URL for a file in Supabase storage
 * @param path The path to the file in storage (including country code folder)
 * @returns The public URL for the file
 */
export const getStorageUrl = (path: string): string => {
  if (!path) return '';
  
  // Handle already complete URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
};

/**
 * Upload a file to Supabase storage in the country-specific folder
 * @param file The file to upload
 * @param countryCode The country code to use as the folder
 * @param filename Optional custom filename
 * @returns The path to the uploaded file
 */
export const uploadToStorage = async (
  file: File,
  countryCode: string,
  filename?: string
): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${countryCode}/${filename || `${Date.now()}.${fileExt}`}`;
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    
  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }
  
  return data.path;
};

/**
 * List files in a specific country folder
 * @param countryCode The country code to list files for
 * @returns Array of file objects
 */
export const listCountryFiles = async (countryCode: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(countryCode);
    
  if (error) {
    console.error('Error listing files:', error);
    return [];
  }
  
  return data;
};

/**
 * Delete a file from storage
 * @param path The path to the file to delete
 * @returns Success status
 */
export const deleteFromStorage = async (path: string): Promise<boolean> => {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);
    
  if (error) {
    console.error('Error deleting file:', error);
    return false;
  }
  
  return true;
};
