# Sample Content Upload Script

This directory contains sample content and a script to upload it to your Strapi CMS.

## Files

- `sample-content.json`: Contains sample FAQs and testimonials for different countries and categories
- `upload_sample_content.py`: Python script to upload the content to Strapi

## Prerequisites

1. Python 3.6+
2. Required packages:

   ```bash
   pip install requests
   ```

3. Running Strapi instance
4. Strapi API Token with write permissions

## 

1. Set your Strapi API token as an environment variable:

   ```bash
   export STRAPI_API_TOKEN="your-token-here"
   ```

2. Update the `BASE_URL` in the script if your Strapi instance is not running on the default `http://localhost:1337`

## Running the Script

```bash
python upload_sample_content.py
```

## Content Structure

The script follows the Strapi schema defined in `contentTypes.d.ts`:

### FAQs

- Matches the `ApiFaqFaq` schema
- Categories: home, franchise, courses, book
- Includes question, answer, category, and order
- Associated with a country

### Testimonials

- Matches the `ApiTestimonialTestimonial` schema
- Categories: general, laundry, cleaning, franchise
- Includes content, rating, author details, and platform
- Associated with a country

## Error Handling

- The script includes error handling for API requests
- Validates required fields before upload
- Provides detailed error messages if something goes wrong

## Notes

- The script will create countries if they don't exist
- All content is published immediately (publishedAt is set to current time)
- The script maps frontend categories to Strapi schema categories where needed
 