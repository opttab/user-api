/**
 * Opttab User API - JavaScript Example
 * Complete integration example showing all major endpoints
 */

const axios = require('axios');

class OpttabUserAPI {
  /**
   * Initialize the Opttab User API client
   * @param {string} apiKey - Your Opttab API key
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://opttab.com/api/v1/user';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get user profile information
   */
  async getProfile() {
    const response = await axios.get(`${this.baseURL}/profile`, { headers: this.headers });
    return response.data;
  }

  /**
   * Get user statistics
   */
  async getStats() {
    const response = await axios.get(`${this.baseURL}/stats`, { headers: this.headers });
    return response.data;
  }

  /**
   * List all assets
   * @param {number} limit - Number of assets to return
   * @param {string} status - Filter by status (optional)
   */
  async listAssets(limit = 10, status = null) {
    const params = { limit };
    if (status) params.status = status;
    
    const response = await axios.get(`${this.baseURL}/assets`, {
      headers: this.headers,
      params
    });
    return response.data;
  }

  /**
   * Create a new asset
   * @param {Object} assetData - Asset data
   */
  async createAsset(assetData) {
    const response = await axios.post(
      `${this.baseURL}/assets`,
      assetData,
      { headers: this.headers }
    );
    return response.data;
  }

  /**
   * Update an asset
   * @param {number} assetId - Asset ID
   * @param {Object} updateData - Data to update
   */
  async updateAsset(assetId, updateData) {
    const response = await axios.put(
      `${this.baseURL}/assets/${assetId}`,
      updateData,
      { headers: this.headers }
    );
    return response.data;
  }

  /**
   * Delete an asset
   * @param {number} assetId - Asset ID
   */
  async deleteAsset(assetId) {
    const response = await axios.delete(
      `${this.baseURL}/assets/${assetId}`,
      { headers: this.headers }
    );
    return response.data;
  }

  /**
   * Get analytics for an asset
   * @param {number} assetId - Asset ID
   */
  async getAssetAnalytics(assetId) {
    const response = await axios.get(
      `${this.baseURL}/assets/${assetId}/analytics`,
      { headers: this.headers }
    );
    return response.data;
  }

  /**
   * Get overall analytics summary
   */
  async getAnalyticsSummary() {
    const response = await axios.get(
      `${this.baseURL}/analytics/summary`,
      { headers: this.headers }
    );
    return response.data;
  }
}

// Example usage
async function main() {
  // Initialize client
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  const client = new OpttabUserAPI(apiKey);

  try {
    // Get profile
    console.log('Fetching profile...');
    const profile = await client.getProfile();
    console.log(`Hello, ${profile.name}!`);

    // Get stats
    console.log('\nFetching stats...');
    const stats = await client.getStats();
    console.log(`Total assets: ${stats.assets_count}`);

    // List assets
    console.log('\nListing assets...');
    const assets = await client.listAssets(5);
    console.log(`Found ${assets.length} assets`);
    assets.forEach(asset => {
      console.log(`  - ${asset.name} (${asset.category})`);
    });

    // Create new asset
    console.log('\nCreating new asset...');
    const newAsset = await client.createAsset({
      name: 'My API Test Asset',
      category: 'creative_work',
      description: 'Created via JavaScript API',
      links: ['https://example.com'],
      ai_models: ['OpenAI', 'Google Gemini']
    });
    console.log(`Created asset with ID: ${newAsset.data.id}`);

    // Update asset
    console.log('\nUpdating asset...');
    await client.updateAsset(newAsset.data.id, {
      description: 'Updated via JavaScript API'
    });
    console.log('Asset updated successfully');

    // Get analytics
    console.log('\nFetching analytics summary...');
    const analytics = await client.getAnalyticsSummary();
    console.log('Analytics:', JSON.stringify(analytics, null, 2));

    // Delete asset (cleanup)
    console.log('\nDeleting test asset...');
    await client.deleteAsset(newAsset.data.id);
    console.log('Asset deleted successfully');

  } catch (error) {
    if (error.response) {
      console.error(`API Error: ${error.response.status}`);
      console.error('Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = OpttabUserAPI;

