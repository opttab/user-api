# Opttab User API

<div align="center">
  <img src="https://opttab.com/upload/images/logo/JPbB-sticky-opttab-logo.svg" alt="Opttab Logo" width="200" height="60">

**Official REST API for Opttab Platform**

Manage your assets, campaigns, and analytics programmatically

[![API Version](https://img.shields.io/badge/API%20Version-v1-blue)](https://opttab.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production-success)](https://opttab.com)

[Documentation](https://opttab.com/dashboard/user/api-documentation) • [Get API Key](https://opttab.com/dashboard/user/api-keys) • [Support](mailto:support@opttab.com)

</div>

---

## 🚀 Quick Start

```bash
# Get your profile
curl -H "X-API-Key: your_api_key_here" \
  https://opttab.com/api/v1/user/profile

# List your assets
curl -H "X-API-Key: your_api_key_here" \
  https://opttab.com/api/v1/user/assets?limit=10
```

## 📋 Table of Contents

- [Authentication](#-authentication)
- [Endpoints](#-endpoints)
- [Examples](#-examples)
- [Rate Limits](#-rate-limits)
- [Error Handling](#-error-handling)
- [Integration Guides](#-integration-guides)

---

## 🔐 Authentication

The User API supports **two authentication methods**:

### Method 1: API Key (Recommended)

```bash
curl -H "X-API-Key: opttab_your_api_key" \
  https://opttab.com/api/v1/user/profile
```

### Method 2: OAuth 2.0 Bearer Token

```bash
curl -H "Authorization: Bearer your_access_token" \
  https://opttab.com/api/v1/user/profile
```

### 🔑 Get Your API Key

1. Login to [Opttab Dashboard](https://opttab.com/dashboard)
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New Key**
4. Copy and securely store your key

---

## 📡 Endpoints

### Base URL
```
https://opttab.com/api/v1/user
```

### Profile & Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/profile` | Get user profile |
| `GET` | `/stats` | Get account statistics |

### Assets Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/assets` | List all assets |
| `POST` | `/assets` | Create new asset |
| `PUT` | `/assets/{id}` | Update asset |
| `DELETE` | `/assets/{id}` | Delete asset |
| `GET` | `/assets/{id}/analytics` | Get asset analytics |

### Studio Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/studio/content` | List content items |
| `POST` | `/studio/content` | Create content |

### Campaigns

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/campaigns` | List campaigns |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/analytics/summary` | Get analytics overview |

---

## 💡 Examples

### List Assets

```bash
curl -X GET "https://opttab.com/api/v1/user/assets?limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 123,
    "name": "My Product",
    "category": "product_listing",
    "description": "Product description",
    "status": "fully-opt-in",
    "ai_models": ["OpenAI", "Google Gemini", "Anthropic"],
    "links": ["https://example.com/product"],
    "created_at": "2025-10-20T10:00:00Z",
    "updated_at": "2025-10-20T10:00:00Z"
  }
]
```

### Create Asset

```bash
curl -X POST "https://opttab.com/api/v1/user/assets" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Creative Work",
    "category": "creative_work",
    "description": "Portfolio website and designs",
    "links": ["https://myportfolio.com"],
    "ai_models": ["OpenAI", "Anthropic", "Google Gemini"]
  }'
```

**Response:**
```json
{
  "message": "Asset created successfully",
  "data": {
    "id": 124,
    "name": "My Creative Work",
    "category": "creative_work",
    "status": "partial-opt-in",
    "created_at": "2025-10-20T10:05:00Z"
  }
}
```

### Update Asset

```bash
curl -X PUT "https://opttab.com/api/v1/user/assets/124" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "ai_models": ["OpenAI"]
  }'
```

### Get Analytics Summary

```bash
curl -X GET "https://opttab.com/api/v1/user/analytics/summary" \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
{
  "data": {
    "assets": {
      "total": 15,
      "fully_opt_in": 8,
      "fully_opt_out": 2,
      "partial_opt_in": 5
    },
    "content": {
      "total": 42,
      "published": 35
    },
    "ai_usage": {
      "total_generations": 1250,
      "total_words": 125000
    }
  }
}
```

---

## 📦 Asset Categories

| Category | Description |
|----------|-------------|
| `product_listing` | Product listings and marketplaces |
| `original_images` | Original photography and images |
| `copyrighted_content` | Copyrighted materials |
| `creative_work` | Creative works and portfolios |
| `brand_assets` | Brand materials and assets |
| `personal_data` | Personal information |
| `likeness_name` | Name and identity |
| `likeness_image` | Personal appearance |
| `likeness_voice` | Voice recordings |
| `local_business` | Local business information |

---

## 🤖 Supported AI Models

OpenAI • Google Gemini • Anthropic (Claude) • Meta AI • Mistral • Perplexity • Stability AI • Midjourney • Cohere • Hugging Face • xAI Grok • DeepSeek • ElevenLabs • Leonardo AI • Runway • Adept • Character.AI • Inflection (Pi)

---

## ⚡ Rate Limits

| Plan | Requests/min | Requests/hour | Requests/day |
|------|-------------|---------------|--------------|
| **Free** | 60 | 1,000 | 10,000 |
| **Pro** | 120 | 5,000 | 50,000 |
| **Enterprise** | 300 | 15,000 | 150,000 |

**Rate limit headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1634567890
```

---

## 🚨 Error Handling

### Error Response Format

```json
{
  "error": "Validation failed",
  "errors": {
    "name": ["The name field is required."],
    "category": ["The category field is required."]
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found |
| `422` | Validation Error |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |

---

## 🔗 Integration Guides

### Python

```python
import requests

API_KEY = "your_api_key_here"
BASE_URL = "https://opttab.com/api/v1/user"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# Get assets
response = requests.get(f"{BASE_URL}/assets", headers=headers)
assets = response.json()
print(f"Found {len(assets)} assets")

# Create asset
new_asset = {
    "name": "My Product",
    "category": "product_listing",
    "description": "A great product",
    "links": ["https://example.com"],
    "ai_models": ["OpenAI", "Google Gemini"]
}

response = requests.post(f"{BASE_URL}/assets", headers=headers, json=new_asset)
result = response.json()
print(f"Created asset with ID: {result['data']['id']}")
```

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://opttab.com/api/v1/user';

const headers = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json'
};

// Get assets
async function getAssets() {
  try {
    const response = await axios.get(`${BASE_URL}/assets`, { headers });
    console.log(`Found ${response.data.length} assets`);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Create asset
async function createAsset() {
  const newAsset = {
    name: 'My Product',
    category: 'product_listing',
    description: 'A great product',
    links: ['https://example.com'],
    ai_models: ['OpenAI', 'Google Gemini']
  };
  
  try {
    const response = await axios.post(`${BASE_URL}/assets`, newAsset, { headers });
    console.log(`Created asset with ID: ${response.data.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

getAssets();
```

### PHP

```php
<?php

$apiKey = 'your_api_key_here';
$baseUrl = 'https://opttab.com/api/v1/user';

// Get assets
$ch = curl_init("$baseUrl/assets");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-API-Key: $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$assets = json_decode($response, true);
curl_close($ch);

echo "Found " . count($assets) . " assets\n";

// Create asset
$newAsset = [
    'name' => 'My Product',
    'category' => 'product_listing',
    'description' => 'A great product',
    'links' => ['https://example.com'],
    'ai_models' => ['OpenAI', 'Google Gemini']
];

$ch = curl_init("$baseUrl/assets");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($newAsset));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-API-Key: $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$result = json_decode($response, true);
curl_close($ch);

echo "Created asset with ID: " . $result['data']['id'] . "\n";
?>
```

---

## 🔌 Third-Party Integrations

### Zapier

Connect Opttab with 5,000+ apps using our Zapier integration.

**Available Triggers:**
- New Asset Created
- Asset Updated
- Campaign Status Changed

**Available Actions:**
- Create Asset
- Update Asset
- Get Asset Details

[Connect on Zapier →](https://zapier.com/apps/opttab/integrations)

### Make (Integromat)

Build powerful workflows with Make's visual automation builder.

[View Integration →](https://www.make.com/en/integrations/opttab)

---

## 🔒 Security Best Practices

✅ **DO:**
- Always use HTTPS
- Store API keys in environment variables
- Rotate keys regularly
- Use separate keys for development and production
- Implement proper error handling

❌ **DON'T:**
- Expose API keys in client-side code
- Commit API keys to version control
- Share API keys via insecure channels
- Use the same key across multiple applications

---

## 📚 Additional Resources

- [Full API Documentation](https://opttab.com/dashboard/user/api-documentation)
- [Developer Portal](https://opttab.com/developers)
- [API Status Page](https://status.opttab.com)
- [Community Forum](https://community.opttab.com)
- [Discord Server](https://discord.gg/opttab)

---

## 💬 Support

Need help? We're here for you!

- 📧 Email: [support@opttab.com](mailto:support@opttab.com)
- 💬 Discord: [Join our community](https://discord.gg/opttab)
- 📖 Docs: [opttab.com/docs](https://opttab.com/docs)
- 🐛 Issues: [GitHub Issues](https://github.com/opttab/user-api/issues)

---

## 📄 License

This API documentation is provided under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ by [Opttab Team](https://opttab.com)**

[Website](https://opttab.com) • [Dashboard](https://opttab.com/dashboard) • [Blog](https://opttab.com/blog) • [Twitter](https://twitter.com/opttab)

</div>

