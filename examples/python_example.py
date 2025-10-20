"""
Opttab User API - Python Example
Complete integration example showing all major endpoints
"""

import requests
import json
from typing import Dict, List, Optional

class OpttabUserAPI:
    """Python client for Opttab User API"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://opttab.com/api/v1/user"
        self.headers = {
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        }
    
    def get_profile(self) -> Dict:
        """Get user profile information"""
        response = requests.get(
            f"{self.base_url}/profile",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_stats(self) -> Dict:
        """Get user statistics"""
        response = requests.get(
            f"{self.base_url}/stats",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def list_assets(self, limit: int = 10, status: Optional[str] = None) -> List[Dict]:
        """List all assets"""
        params = {"limit": limit}
        if status:
            params["status"] = status
        
        response = requests.get(
            f"{self.base_url}/assets",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()
    
    def create_asset(
        self,
        name: str,
        category: str,
        description: str = "",
        links: List[str] = None,
        ai_models: List[str] = None
    ) -> Dict:
        """Create a new asset"""
        data = {
            "name": name,
            "category": category,
            "description": description,
            "links": links or [],
            "ai_models": ai_models or []
        }
        
        response = requests.post(
            f"{self.base_url}/assets",
            headers=self.headers,
            json=data
        )
        response.raise_for_status()
        return response.json()
    
    def update_asset(self, asset_id: int, **kwargs) -> Dict:
        """Update an asset"""
        response = requests.put(
            f"{self.base_url}/assets/{asset_id}",
            headers=self.headers,
            json=kwargs
        )
        response.raise_for_status()
        return response.json()
    
    def delete_asset(self, asset_id: int) -> Dict:
        """Delete an asset"""
        response = requests.delete(
            f"{self.base_url}/assets/{asset_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_asset_analytics(self, asset_id: int) -> Dict:
        """Get analytics for an asset"""
        response = requests.get(
            f"{self.base_url}/assets/{asset_id}/analytics",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_analytics_summary(self) -> Dict:
        """Get overall analytics summary"""
        response = requests.get(
            f"{self.base_url}/analytics/summary",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()


def main():
    """Example usage"""
    
    # Initialize client
    api_key = "your_api_key_here"  # Replace with your actual API key
    client = OpttabUserAPI(api_key)
    
    try:
        # Get profile
        print("Fetching profile...")
        profile = client.get_profile()
        print(f"Hello, {profile['name']}!")
        
        # Get stats
        print("\nFetching stats...")
        stats = client.get_stats()
        print(f"Total assets: {stats['assets_count']}")
        
        # List assets
        print("\nListing assets...")
        assets = client.list_assets(limit=5)
        print(f"Found {len(assets)} assets")
        for asset in assets:
            print(f"  - {asset['name']} ({asset['category']})")
        
        # Create new asset
        print("\nCreating new asset...")
        new_asset = client.create_asset(
            name="My API Test Asset",
            category="creative_work",
            description="Created via Python API",
            links=["https://example.com"],
            ai_models=["OpenAI", "Google Gemini"]
        )
        print(f"Created asset with ID: {new_asset['data']['id']}")
        
        # Update asset
        print("\nUpdating asset...")
        updated = client.update_asset(
            new_asset['data']['id'],
            description="Updated via Python API"
        )
        print("Asset updated successfully")
        
        # Get analytics
        print("\nFetching analytics summary...")
        analytics = client.get_analytics_summary()
        print(f"Analytics: {json.dumps(analytics, indent=2)}")
        
        # Delete asset (cleanup)
        print(f"\nDeleting test asset...")
        client.delete_asset(new_asset['data']['id'])
        print("Asset deleted successfully")
        
    except requests.exceptions.HTTPError as e:
        print(f"API Error: {e.response.status_code}")
        print(f"Response: {e.response.text}")
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    main()

