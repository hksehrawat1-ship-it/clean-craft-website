import { useState, useEffect } from "react";
import { useCountry } from "@/contexts/CountryContext";
import yaml from "js-yaml";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

interface PagesSEOData {
  seo: {
    global: {
      defaults: {
        title_suffix: string;
        keywords_base: string[];
        description?: string;
        image: string;
      };
    };
    pages: {
      [path: string]: {
        [country: string]: SEOConfig;
      };
    };
  };
}

let pagesData: PagesSEOData | null = null;

async function loadPagesYaml(): Promise<PagesSEOData> {
  if (pagesData) return pagesData;

  try {
    let response = await fetch("/config/pages.yaml");
    if (!response.ok) response = await fetch("/pages.yaml");
    if (!response.ok) throw new Error("pages.yaml not found");

    const yamlText = await response.text();
    if (!yamlText.trim()) throw new Error("Empty YAML");

    try {
      pagesData = yaml.load(yamlText) as PagesSEOData;
    } catch (yamlError) {
      throw new Error(`YAML parsing failed: ${yamlError}`);
    }

    if (!pagesData?.seo) throw new Error("Invalid SEO structure");
    return pagesData;
  } catch (error) {
    console.error("❌ Failed to load pages.yaml:", error);
    return {
      seo: {
        global: {
          defaults: {
            title_suffix: " | CleanCraft",
            keywords_base: ["professional cleaning", "garment care"],
            description: "Best laundry and dry cleaning service in your city.",
            image:
              "https://cleancraft.com/lovable-uploads/cleancraft-full-logo.png",
          },
        },
        pages: {},
      },
    };
  }
}

export function usePageConfigSEO(slug: string) {
  const { currentCountry } = useCountry();
  const [seoData, setSeoData] = useState<{
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_image: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSEOData() {
      setIsLoading(true);
      try {
        const data = await loadPagesYaml();
        const countryCode = currentCountry?.toLowerCase() || "in";
        const cleanSlug = slug.replace(/^\/[a-z]{2}\//, "/");

        const pageSEO = data.seo?.pages?.[cleanSlug]?.[countryCode];
        const globalDefaults = data.seo?.global?.defaults;

        // 🐞 Debug Logs
        console.log("✅ Full YAML:", data);
        console.log("✅ Country:", countryCode);
        console.log("✅ Slug:", cleanSlug);
        console.log("✅ PageSEO:", pageSEO);

        const title =
          (pageSEO?.title || "CleanCraft") + (globalDefaults?.title_suffix || "");

        const description =
          pageSEO?.description || globalDefaults?.description || "";

        const keywords = [
          ...(pageSEO?.keywords || []),
          ...(globalDefaults?.keywords_base || []),
        ];

        const image = pageSEO?.image || globalDefaults?.image || "";

        setSeoData({
          seo_title: title,
          seo_description: description,
          seo_keywords: keywords.join(", "),
          seo_image: image,
        });
      } catch (error) {
        console.error("❌ SEO load error:", error);
        setSeoData(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadSEOData();
  }, [slug, currentCountry]);

  return {
    data: seoData,
    isLoading,
  };
}
