import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../../../../components/Layout";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#1c1c1e",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <span style={{ fontSize: "12px", color: "#888" }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            background: "transparent",
            border: "none",
            borderRadius: "4px",
            color: copied ? "#4ade80" : "#888",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.15s ease",
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "16px",
          overflow: "auto",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#e0e0e0",
          fontFamily: "monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

const nextSteps = [
  {
    title: "Explore Components",
    description: "Browse the full library of available components",
    link: "/docs/web",
  },
  {
    title: "Learn Theming",
    description: "Customize Eufemia to match your project's needs",
    link: "/docs/web/theming",
  },
  {
    title: "Typography",
    description: "Understand the typography system and text styles",
    link: "/docs/web/typography",
  },
  {
    title: "Icons",
    description: "Browse and use the icon library",
    link: "/docs/web/icons",
  },
];

const DevelopPage: React.FC = () => {
  return (
    <Layout currentPlatform="web" currentPath="/docs/web/getting-started/develop">
      <div style={{ padding: "48px 40px", maxWidth: "900px" }}>
        {/* Hero */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "linear-gradient(135deg, #e6f2f2 0%, #d4ebeb 100%)",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#a5e1d2",
              marginBottom: "16px",
            }}
          >
            Development
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#1c1c1e",
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Start Developing
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: "700px",
            }}
          >
            Get up and running with Eufemia in your React project. Follow this guide
            to install the packages and start using components.
          </p>
        </div>

        {/* Installation */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          Installation
        </h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          Install Eufemia using your preferred package manager:
        </p>
        <div style={{ marginBottom: "32px" }}>
          <CodeBlock code="npm install @dnb/eufemia" language="npm" />
        </div>
        <div style={{ marginBottom: "48px" }}>
          <CodeBlock code="yarn add @dnb/eufemia" language="yarn" />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            margin: "48px 0",
          }}
        />

        {/* Setup */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          Setup
        </h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          Import the Eufemia styles and wrap your application with the Provider:
        </p>
        <div style={{ marginBottom: "48px" }}>
          <CodeBlock
            code={`import { Provider } from '@dnb/eufemia/shared'
import '@dnb/eufemia/style'

function App() {
  return (
    <Provider>
      <YourApp />
    </Provider>
  )
}`}
            language="jsx"
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            margin: "48px 0",
          }}
        />

        {/* Using Components */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          Using Components
        </h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          Import and use components directly from the package:
        </p>
        <div style={{ marginBottom: "48px" }}>
          <CodeBlock
            code={`import { Button, Input, Card } from '@dnb/eufemia'

function MyComponent() {
  return (
    <Card>
      <Input label="Email address" />
      <Button variant="primary">
        Submit
      </Button>
    </Card>
  )
}`}
            language="jsx"
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            margin: "48px 0",
          }}
        />

        {/* TypeScript */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          TypeScript Support
        </h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          Eufemia is built with TypeScript and provides full type definitions out of the box.
          No additional setup required.
        </p>
        <div
          style={{
            padding: "20px",
            background: "#fafafa",
            borderRadius: "8px",
            marginBottom: "48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: "#3178c6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              TS
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#1c1c1e", margin: 0 }}>
                Full TypeScript support included
              </p>
              <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
                Types are bundled with the package - no @types/* package needed
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            margin: "48px 0",
          }}
        />

        {/* Next Steps */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
          }}
        >
          Next Steps
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {nextSteps.map((step) => (
            <Link
              key={step.title}
              to={step.link}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#a5e1d2";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e8e8e8";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#a5e1d2", marginBottom: "4px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                  {step.description}
                </p>
              </div>
              <div style={{ color: "#a5e1d2" }}>
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DevelopPage;

export const Head = () => <title>Start Developing | Eufemia Design System</title>;
