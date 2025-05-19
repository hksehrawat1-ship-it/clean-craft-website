import json
import requests
from typing import Dict, List, Any, Optional
import os
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:1337/api"  # Change this to your Strapi URL
API_TOKEN = os.getenv("STRAPI_API_TOKEN")  # Set your API token in environment variable

if not API_TOKEN:
    raise ValueError("Please set STRAPI_API_TOKEN environment variable")

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

def load_sample_data() -> Dict[str, Any]:
    """Load sample content from JSON file"""
    with open("sample-content.json", "r") as f:
        return json.load(f)

def get_country(code: str) -> Optional[int]:
    """Get country ID by code"""
    response = requests.get(
        f"{BASE_URL}/countries",
        headers=headers
    )
    response.raise_for_status()
    data = response.json()
    return data["data"][0]["id"] if data.get("data") else None

def create_country(code: str, name: str) -> int:
    """Create a country and return its ID"""
    payload = {
        "data": {
            "code": code.upper(),
            "name": name,
            "is_active": True,
            "publishedAt": datetime.now().isoformat()
        }
    }
    
    response = requests.post(f"{BASE_URL}/countries", headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["data"]["id"]

def get_or_create_country(code: str, name: str) -> int:
    """Get existing country or create new one"""
    country_id = get_country(code)
    if country_id is None:
        print(f"Creating new country: {name} ({code})")
        country_id = create_country(code, name)
    else:
        print(f"Found existing country: {name} ({code})")
    return country_id

def create_faq(data: Dict[str, Any], country_id: int) -> int:
    """Create a FAQ entry"""
    payload = {
        "data": {
            "question": data["question"],
            "answer": data["answer"],
            "category": data["category"],
            "order": data["order"],
            "country": country_id,
            "publishedAt": datetime.now().isoformat()
        }
    }
    
    response = requests.post(f"{BASE_URL}/faqs", headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["data"]["id"]

def create_testimonial(data: Dict[str, Any], country_id: int) -> int:
    """Create a testimonial entry"""
    payload = {
        "data": {
            "content": data["content"],
            "rating": data["rating"],
            "name": data["author_name"],
            "platform": data["platform"],
            "category": map_testimonial_category(data["category"]),
            "country": country_id,
            "publishedAt": datetime.now().isoformat()
        }
    }
    
    response = requests.post(f"{BASE_URL}/testimonials", headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["data"]["id"]

def map_testimonial_category(category: str) -> str:
    """Map frontend categories to Strapi schema categories"""
    category_mapping = {
        "home": "home",
        "franchise": "franchise",
        "courses": "courses",
        "book": "book"
    }
    return category_mapping.get(category, "home")

def main():
    try:
        print("Loading sample data...")
        data = load_sample_data()
        
        # Process each country's content
        for country_code, country_data in data["faqs"].items():
            print(f"\nProcessing content for country: {country_code}")
            
            # Get or create country
            country_name = "India" if country_code == "in" else "Australia"
            country_id = get_or_create_country(country_code, country_name)
            print(f"Using country ID: {country_id}")
            
            # Create FAQs
            print("Creating FAQs...")
            for category, faqs in country_data.items():
                for faq in faqs:
                    faq["category"] = category
                    faq_id = create_faq(faq, country_id)
                    print(f"Created FAQ: {faq_id} - {faq['question'][:50]}...")
            
            # Create Testimonials
            if country_code in data["testimonials"]:
                print("Creating Testimonials...")
                for category, testimonials in data["testimonials"][country_code].items():
                    for testimonial in testimonials:
                        testimonial["category"] = category
                        testimonial_id = create_testimonial(testimonial, country_id)
                        print(f"Created Testimonial: {testimonial_id} - {testimonial['content'][:50]}...")
        
        print("\nContent upload completed successfully!")

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        if hasattr(e, 'response'):
            print(f"Response: {e.response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()