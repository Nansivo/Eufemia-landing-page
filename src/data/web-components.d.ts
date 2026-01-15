interface WebComponent {
  slug: string;
  name: string;
  description: string;
  path: string;
  category: string;
  external: boolean;
}

interface WebComponentsData {
  generated: string;
  source: string;
  baseUrl: string;
  count: number;
  components: WebComponent[];
}

declare const data: WebComponentsData;
export default data;
