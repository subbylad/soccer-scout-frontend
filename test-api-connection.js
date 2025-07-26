#!/usr/bin/env node

/**
 * Test script to verify API connection between frontend and backend
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://soccer-scout-api-production.up.railway.app';

async function testAPIConnection() {
  console.log('🧪 Testing API Connection');
  console.log(`📍 API URL: ${API_URL}`);
  console.log('=' * 50);

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check successful');
      console.log(`   Status: ${healthData.data?.status || healthData.status}`);
    } else {
      console.log(`❌ Health check failed: ${healthResponse.status}`);
    }

    // Test query endpoint
    console.log('\n2. Testing query endpoint...');
    const queryResponse = await fetch(`${API_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: 'Find young midfielders under 21'
      }),
    });

    if (queryResponse.ok) {
      const queryData = await queryResponse.json();
      console.log('✅ Query test successful');
      console.log(`   Response: ${queryData.data?.response_text?.substring(0, 100) || queryData.response_text?.substring(0, 100)}...`);
    } else {
      console.log(`❌ Query test failed: ${queryResponse.status}`);
      const errorText = await queryResponse.text();
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }

    console.log('\n🎉 API connection test completed!');

  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
  }
}

testAPIConnection();