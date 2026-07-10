import React from 'react';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';
import TokensViewer from '../../components/TokensViewer';

interface Token {
  id: string;
  name: string;
  type: string;
  description: string;
  collection: string;
  colorValues: Array<{
    modeName: string;
    hex: string;
    rgb: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }>;
}

interface PageProps {
  pageContext: {
    platform: 'ios' | 'android';
    designTokens: Token[];
    lastUpdated: string | null;
  };
}

const DesignTokensPage: React.FC<PageProps> = ({ pageContext }) => {
  const { platform, designTokens, lastUpdated } = pageContext;
  const platformLabel = platform === 'ios' ? 'iOS' : 'Android';
  const platformPath = `/docs/${platform}`;

  return (
    <Layout currentPlatform={platform} currentPath={platformPath}>
      <div style={{ padding: '48px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#666',
            marginBottom: '24px',
          }}
        >
          <Link to={platformPath} style={{ color: '#a5e1d2', textDecoration: 'none' }}>
            {platformLabel}
          </Link>
          <span>/</span>
          <span style={{ color: '#1c1c1e' }}>Design Tokens</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#1c1c1e',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Design Tokens
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#555',
              maxWidth: '600px',
            }}
          >
            Browse and copy color tokens for your {platformLabel} designs. Select a brand mode to view tokens in different styles.
          </p>
          {lastUpdated && (
            <p style={{ fontSize: '13px', color: '#999', marginTop: '16px' }}>
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Tokens Viewer */}
        {designTokens && designTokens.length > 0 ? (
          <TokensViewer tokens={designTokens} />
        ) : (
          <div
            style={{
              padding: '48px 40px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#999',
            }}
          >
            <p>No design tokens available yet.</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Run the import script to populate design tokens from your Figma file.
            </p>
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e8e8e8' }}>
          <Link
            to={platformPath}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#a5e1d2',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to {platformLabel}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DesignTokensPage;

export const Head: React.FC<PageProps> = ({ pageContext }) => (
  <title>Design Tokens | Eufemia Design System</title>
);
