import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";

interface BlockChild {
  _key: string;
  _type: string;
  text?: string;
  marks?: string[];
}

interface Block {
  _key: string;
  _type: string;
  style?: string;
  children?: BlockChild[];
  asset?: {
    _ref?: string;
    url?: string;
  };
}

interface ComponentData {
  id: string;
  name?: string;
  platform?: string;
  shortDescription?: string;
  figmaLink?: string;
  githubLink?: string;
  guidelines?: string | null;
  usage?: string | null;
  dosAndDonts?: string | null;
  accessibilityInfo?: string | null;
  _rawDocumentation?: Block[] | null;
  _rawPreviewImage?: {
    light?: {
      asset?: {
        _ref?: string;
        url?: string;
      };
    };
    dark?: {
      asset?: {
        _ref?: string;
        url?: string;
      };
    };
  } | null;
  [key: string]: any;
}

interface Props {
  data: {
    sanityComponent: ComponentData;
  };
}

// Helper to build Sanity image URL
const buildImageUrl = (ref: string) => {
  // ref format: image-{id}-{width}x{height}-{format}
  const [, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/sy4b7kpu/production/${id}-${dimensions}.${format}`;
};

// Simple portable text renderer
const renderBlock = (block: Block, index: number, isDark: boolean) => {
  // Handle images
  if (block._type === "image" && block.asset?._ref) {
    const imageUrl = buildImageUrl(block.asset._ref);
    return (
      <div
        key={index}
        style={{
          margin: "24px 0",
          borderRadius: "8px",
          overflow: "hidden",
          border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
        }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    );
  }

  if (block._type !== "block") return null;

  const text = block.children?.map((child, i) => {
    if (child.marks?.includes("strong")) {
      return <strong key={i}>{child.text}</strong>;
    }
    if (child.marks?.includes("em")) {
      return <em key={i}>{child.text}</em>;
    }
    if (child.marks?.includes("code")) {
      return (
        <code
          key={i}
          style={{
            background: isDark ? "#222" : "#f5f5f5",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "14px",
            color: isDark ? "#ccc" : "#333",
          }}
        >
          {child.text}
        </code>
      );
    }
    return child.text;
  });

  switch (block.style) {
    case "h2":
      return (
        <h2
          key={index}
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1c1c1e",
            marginTop: "32px",
            marginBottom: "16px",
          }}
        >
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1c1c1e",
            marginTop: "24px",
            marginBottom: "12px",
          }}
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4
          key={index}
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1c1c1e",
            marginTop: "20px",
            marginBottom: "8px",
          }}
        >
          {text}
        </h4>
      );
    default:
      return (
        <p
          key={index}
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: isDark ? "#ccc" : "#444",
            marginBottom: "16px",
          }}
        >
          {text}
        </p>
      );
  }
};

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66699 9.33333L14.0003 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FigmaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M8 24C10.208 24 12 22.208 12 20V16H8C5.792 16 4 17.792 4 20C4 22.208 5.792 24 8 24Z" fill="#0ACF83"/>
    <path d="M4 12C4 9.792 5.792 8 8 8H12V16H8C5.792 16 4 14.208 4 12Z" fill="#A259FF"/>
    <path d="M4 4C4 1.792 5.792 0 8 0H12V8H8C5.792 8 4 6.208 4 4Z" fill="#F24E1E"/>
    <path d="M12 0H16C18.208 0 20 1.792 20 4C20 6.208 18.208 8 16 8H12V0Z" fill="#FF7262"/>
    <path d="M20 12C20 14.208 18.208 16 16 16C13.792 16 12 14.208 12 12C12 9.792 13.792 8 16 8C18.208 8 20 9.792 20 12Z" fill="#1ABCFE"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"/>
  </svg>
);

const ComponentTemplate: React.FC<Props> = ({ data }) => {
  const component = data.sanityComponent;
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (!component.name) {
    return (
      <Layout currentPlatform="ios" currentPath="/docs/ios/components">
        <div style={{ padding: "48px 40px" }}>
          <p>Error: Component not found</p>
        </div>
      </Layout>
    );
  }

  const platformLabel = (component.platform === "ios" ? "iOS" : "Android") || "Unknown";
  const platformPath = `/docs/${component.platform || "ios"}`;

  return (
    <Layout currentPlatform={component.platform as "ios" | "android"} currentPath={`${platformPath}/components`}>
      <div style={{ padding: "48px 40px", maxWidth: "800px", background: isDark ? "#000000" : "#fff", color: isDark ? "#fff" : "#000", minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: isDark ? "#999" : "#666",
            marginBottom: "24px",
          }}
        >
          <Link to={platformPath} style={{ color: "#a5e1d2", textDecoration: "none" }}>
            {platformLabel}
          </Link>
          <span>/</span>
          <span>Components</span>
          <span>/</span>
          <span style={{ color: isDark ? "#fff" : "#1c1c1e" }}>{component.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 10px",
              background: component.platform === "ios" ? "#e3f2fd" : "#e8f5e9",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 500,
              color: component.platform === "ios" ? "#1565c0" : "#2e7d32",
              marginBottom: "12px",
            }}
          >
            {platformLabel}
          </div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: isDark ? "#fff" : "#1c1c1e",
              marginBottom: "12px",
              letterSpacing: "-0.5px",
            }}
          >
            {component.name}
          </h1>
          {component.shortDescription && (
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.6,
                color: isDark ? "#ccc" : "#555",
                maxWidth: "600px",
              }}
            >
              {component.shortDescription}
            </p>
          )}
        </div>

        {/* Preview Images */}
        {(component._rawPreviewImage?.light?.asset || component._rawPreviewImage?.dark?.asset) && (
          <div
            style={{
              marginBottom: "40px",
              paddingBottom: "32px",
              borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
            }}
          >
            {theme === "light" && component._rawPreviewImage?.light?.asset && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 500, marginBottom: "8px", color: isDark ? "#999" : "#666" }}>
                  Light Mode
                </div>
                <img
                  src={component._rawPreviewImage.light.asset.url || buildImageUrl(component._rawPreviewImage.light.asset._ref || "")}
                  alt="Preview - Light Mode"
                  style={{ width: "100%", height: "auto", borderRadius: "8px", border: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}
                />
              </div>
            )}
            {theme === "dark" && component._rawPreviewImage?.dark?.asset && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 500, marginBottom: "8px", color: isDark ? "#999" : "#666" }}>
                  Dark Mode
                </div>
                <img
                  src={component._rawPreviewImage.dark.asset.url || buildImageUrl(component._rawPreviewImage.dark.asset._ref || "")}
                  alt="Preview - Dark Mode"
                  style={{ width: "100%", height: "auto", borderRadius: "8px", border: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons Section */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px",
            paddingBottom: "32px",
            borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
            flexWrap: "wrap",
          }}
        >
          {/* Compare Button - Always First */}
          <button
            onClick={() => {
              // Dispatch custom event to open search in compare mode
              window.dispatchEvent(new Event("openSearchCompare"));
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              background: isDark ? "#0d4637" : "#f0f7f7",
              border: isDark ? "1px solid #1a5c5c" : "1px solid #b3dede",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: isDark ? "#66c9c9" : "#a5e1d2",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? "#1a4c4c" : "#e6f2f2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? "#0d4637" : "#f0f7f7";
            }}
          >
            ↔ Compare
          </button>

          {/* Figma Link */}
          {component.figmaLink && (
            <a
              href={component.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: isDark ? "#1c1c1e" : "#fff",
                border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                color: isDark ? "#ccc" : "#333",
                textDecoration: "none",
              }}
            >
              <FigmaIcon />
              Figma
            </a>
          )}

          {/* GitHub Link */}
          {component.githubLink && (
            <a
              href={component.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: isDark ? "#1c1c1e" : "#fff",
                border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                color: isDark ? "#ccc" : "#333",
                textDecoration: "none",
              }}
            >
              <GitHubIcon />
              GitHub
            </a>
          )}
        </div>

        {/* Guidelines Section */}
        {component.guidelines && (
          <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "16px" }}>Guidelines</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: isDark ? "#ccc" : "#444", marginBottom: "16px", whiteSpace: "pre-wrap" }}>{component.guidelines}</p>
          </div>
        )}

        {/* Usage Section */}
        {component.usage && (
          <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "16px" }}>Usage</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: isDark ? "#ccc" : "#444", marginBottom: "16px", whiteSpace: "pre-wrap" }}>{component.usage}</p>
          </div>
        )}

        {/* Dos and Don'ts Section */}
        {component.dosAndDonts && (
          <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "16px" }}>Dos and Don'ts</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: isDark ? "#ccc" : "#444", marginBottom: "16px", whiteSpace: "pre-wrap" }}>{component.dosAndDonts}</p>
          </div>
        )}

        {/* Accessibility Info Section */}
        {component.accessibilityInfo && (
          <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "16px" }}>Accessibility</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: isDark ? "#ccc" : "#444", marginBottom: "16px", whiteSpace: "pre-wrap" }}>{component.accessibilityInfo}</p>
          </div>
        )}

        {/* Main Documentation content */}
        {component._rawDocumentation && component._rawDocumentation.length > 0 && (
          <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "16px" }}>Documentation</h2>
            <div>{component._rawDocumentation.map((block, i) => renderBlock(block, i, isDark))}</div>
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${isDark ? '#333' : '#e8e8e8'}` }}>
          <Link
            to={platformPath}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "#a5e1d2",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to {platformLabel} Components
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ComponentTemplate;

export const Head: React.FC<Props> = ({ data }) => (
  <title>Component | Eufemia Design System</title>
);

export const query = graphql`
  query ComponentQuery($id: String!) {
    sanityComponent(id: { eq: $id }) {
      id
      name
      platform
      shortDescription
      figmaLink
      githubLink
      guidelines
      usage
      dosAndDonts
      accessibilityInfo
      _rawDocumentation
      _rawPreviewImage
    }
  }
`;
