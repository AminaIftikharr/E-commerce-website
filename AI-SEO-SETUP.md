# AI-Powered SEO Generation Setup

This feature uses Google's Gemini AI to automatically generate SEO-optimized content for your products.

## Setup Instructions

### 1. Get Google AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API key"** or **"Create API key"**
4. Copy the generated API key

### 2. Add API Key to Environment Variables

#### Local Development (.env.local)
```bash
GOOGLE_AI_API_KEY=your-actual-api-key-here
```

#### Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `GOOGLE_AI_API_KEY`
   - **Value:** Your Google AI API key
   - **Environment:** Production (and Preview if needed)
4. Click **Save**
5. Redeploy your application

### 3. Using the AI SEO Generator

1. Go to **Admin Panel** → **Products**
2. Click **"Add Product"** or edit an existing product
3. Fill in the **Product Name** and **Description** (required)
4. Scroll to the **SEO Information** section
5. Click **"Generate with AI"** button
6. The AI will automatically generate:
   - **SEO Title** (optimized for search engines, max 60 chars)
   - **SEO Description** (compelling meta description, max 160 chars)
   - **Keywords** (8-12 relevant SEO keywords)

### 4. What Gets Generated

The AI analyzes your product title and description to create:

- **SEO Title**: Search-engine optimized title with primary keywords
- **SEO Description**: Compelling meta description that encourages clicks
- **Keywords**: Array of relevant keywords including:
  - Product type keywords
  - Feature-based keywords
  - Use case keywords
  - Long-tail keywords
  - Related search terms

### 5. Best Practices

1. **Provide detailed descriptions**: The better your product description, the better the AI-generated SEO content
2. **Review and edit**: Always review AI-generated content and adjust to match your brand voice
3. **Character limits**: SEO titles should be ~60 characters, descriptions ~160 characters
4. **Keyword placement**: Use generated keywords naturally in your product content
5. **Test different inputs**: Try regenerating with slightly different descriptions for variations

### 6. Troubleshooting

**"Google AI API key not configured" error:**
- Verify the API key is added to environment variables
- Check for typos in the variable name (`GOOGLE_AI_API_KEY`)
- Restart your development server after adding the key

**"Failed to generate SEO content" error:**
- Check your internet connection
- Verify your API key is valid and active
- Ensure you haven't exceeded API rate limits
- Check the browser console for detailed error messages

**Empty fields after generation:**
- Ensure product name and description are filled
- Try simplifying the product description
- Check API key permissions in Google AI Studio

### 7. API Limits

Google AI Studio offers:
- **Free tier**: 60 requests per minute
- **Rate limits**: Check [Google AI Studio pricing](https://ai.google.dev/pricing) for current limits

### 8. Security Notes

- Never commit API keys to git repositories
- Keep `.env.local` in `.gitignore`
- Use different API keys for development and production
- Rotate API keys regularly for security
- Monitor API usage in Google AI Studio dashboard

## Example Generated Output

**Input:**
- Title: "Premium Leather Wedding Journal"
- Description: "Handcrafted leather journal perfect for wedding planning with custom embossing options"

**AI Generated:**
```json
{
  "seoTitle": "Premium Leather Wedding Journal - Custom Embossed Planner",
  "seoDescription": "Handcrafted leather wedding journal with custom embossing. Perfect for planning your dream wedding. Personalized keepsake & gift idea.",
  "keywords": [
    "leather wedding journal",
    "custom wedding planner",
    "personalized bridal journal",
    "embossed wedding book",
    "handcrafted wedding diary",
    "wedding planning notebook",
    "custom wedding gift",
    "personalized wedding keepsake"
  ]
}
```

## Support

For issues with:
- **API key setup**: Check Google AI Studio documentation
- **Feature bugs**: Contact your development team
- **SEO optimization**: Consult SEO best practices guides
