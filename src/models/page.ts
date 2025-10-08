export interface PageProps {
  params: Promise<{ locale: AppLocale; id?: string }>;
}

export interface PageData {
  title?: string;
  description?: string;
  heroSection?: {
    title: string;
    description?: string;
  };
  // breadcrumbs?: BreadcrumbItem[];
  // faqData?: FaqData;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  isPrivate?: boolean;
  isArchive?: boolean;
  isDeleted?: boolean;
  // metadata: boolean;
  locale: AppLocale;
}
