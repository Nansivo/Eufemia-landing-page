#!/usr/bin/env node

/**
 * Imports design tokens from a Figma token JSON file into Sanity CMS
 *
 * Run with: SANITY_AUTH_TOKEN=<your-token> node scripts/import-tokens.js [path-to-tokens.json]
 * Example: SANITY_AUTH_TOKEN=sk_abc123 node scripts/import-tokens.js /Users/user/Desktop/tokens.json
 *
 * To get your Sanity auth token:
 * 1. Go to https://manage.sanity.io
 * 2. Select your project
 * 3. Go to Settings > API > Tokens
 * 4. Create a new token with "Editor" permissions
 */

const fs = require('fs');
const path = require('path');

// Use dynamic import for ESM module
async function main() {
  try {
    const { createClient } = await import('@sanity/client');

    // Sanity configuration
    const sanityConfig = {
      projectId: 'sy4b7kpu',
      dataset: 'production',
      apiVersion: '2024-01-15',
      useCdn: false,
      token: process.env.SANITY_AUTH_TOKEN,
    };

    /**
     * Parse Figma tokens JSON and transform to Sanity format
     */
    function parseTokensFile(filePath) {
      console.log(`Reading tokens from: ${filePath}`);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);

      if (!data.tokens || !Array.isArray(data.tokens)) {
        throw new Error('Invalid tokens file format: expected "tokens" array');
      }

      console.log(`Found ${data.tokens.length} tokens to import`);

      // Transform tokens for Sanity
      const transformedTokens = data.tokens.map(token => {
        const colorValues = [];

        // Extract color values from resolvedValuesByMode
        if (token.resolvedValuesByMode && token.type === 'COLOR') {
          Object.entries(token.resolvedValuesByMode).forEach(([modeName, value]) => {
            if (value && value.hex && value.rgb) {
              colorValues.push({
                _key: `${modeName}-${token.id}`.replace(/[^a-z0-9]/gi, ''),
                modeName,
                hex: value.hex,
                rgb: {
                  r: value.rgb.r,
                  g: value.rgb.g,
                  b: value.rgb.b,
                  a: value.rgb.a,
                },
              });
            }
          });
        }

        return {
          _key: token.id.replace(/[^a-z0-9]/gi, ''),
          id: token.id,
          name: token.name,
          type: token.type,
          description: token.description || '',
          collection: token.collection || '',
          colorValues,
        };
      });

      return transformedTokens;
    }

    /**
     * Upload tokens to Sanity
     */
    async function uploadToSanity(tokens) {
      if (!sanityConfig.token) {
        throw new Error('SANITY_AUTH_TOKEN environment variable is not set.\n\nTo get a token:\n1. Go to https://manage.sanity.io\n2. Select your project (sy4b7kpu)\n3. Go to Settings > API > Tokens\n4. Create a new token with "Editor" permissions\n5. Run: SANITY_AUTH_TOKEN=<your-token> node scripts/import-tokens.js <file-path>');
      }

      const client = createClient(sanityConfig);

      // Create or update the designTokens document
      const designTokensDoc = {
        _type: 'designTokens',
        title: 'Eufemia Design Tokens',
        tokens,
        lastUpdated: new Date().toISOString(),
        sourceFile: 'Figma Design Tokens Export',
      };

      try {
        // Check if document exists
        const existing = await client.fetch('*[_type == "designTokens"][0]._id');

        let result;
        if (existing) {
          // Update existing document
          console.log(`Updating existing designTokens document: ${existing}`);
          result = await client.patch(existing)
            .set(designTokensDoc)
            .commit();
          console.log(`✓ Updated ${result._id}`);
        } else {
          // Create new document
          console.log('Creating new designTokens document...');
          result = await client.create(designTokensDoc);
          console.log(`✓ Created ${result._id}`);
        }

        console.log(`✓ Successfully uploaded ${tokens.length} tokens to Sanity`);
        return result;

      } catch (error) {
        throw new Error(`Failed to upload to Sanity: ${error.message}`);
      }
    }

    // Get file path from command line arguments
    let filePath = process.argv[2];

    if (!filePath) {
      throw new Error('Please provide path to tokens JSON file\nUsage: SANITY_AUTH_TOKEN=<token> node scripts/import-tokens.js <path-to-tokens.json>');
    }

    // Resolve absolute path
    if (!path.isAbsolute(filePath)) {
      filePath = path.resolve(filePath);
    }

    console.log('\n=== Design Tokens Import ===\n');

    // Parse tokens file
    const tokens = parseTokensFile(filePath);
    console.log(`✓ Parsed ${tokens.length} tokens\n`);

    // Upload to Sanity
    console.log('Uploading to Sanity CMS...');
    const result = await uploadToSanity(tokens);

    console.log('\n✓ Import complete!');
    console.log(`Document ID: ${result._id}`);
    console.log('\nYou can now access design tokens in Sanity Studio.');
    console.log('Design tokens pages will be available at:');
    console.log('  - /docs/ios/design-tokens');
    console.log('  - /docs/android/design-tokens');

  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
