export type KeyFeature = {
  id: string; // for i18n key
  // icon?: string; // Optional: if you want to associate an icon from lucide-react or similar
};

export type TechnologyDetail = {
  id: string; // e.g., 'react', 'typescript'
  name: string; // e.g., 'React', 'TypeScript'
  // category?: 'frontend' | 'backend' | 'database' | 'devops' | 'other'; // Optional: for grouping
};

export type GalleryImage = {
  id: string;
  src: ImageMetadata; // Source of the gallery image, now strictly ImageMetadata
  alt: string; // Will be translated
  caption?: string; // Optional, will be translated
};

export type ProjectData = {
  id: string; // Keep as is, used for main i18n key and internal reference
  slug: string; // New: for URL generation, e.g., 'my-awesome-project'
  imageUrl?: ImageMetadata; // Main project image, keep as is
  projectUrl?: string; // Link to live project, keep as is
  codeUrl?: string; // Link to source code, keep as is
  tags: Array<string>; // Existing tags, can be used for quick filtering or display

  // New fields for detailed project page
  category?: string; // New: e.g., 'Web Application', 'Mobile App', 'Data Science'. Will be translated.
  date: string; // New: e.g., '2023-06-15', 'Jan 2023 - Mar 2024'. Will be translated.

  // galleryImages will have their alt/captions translated, so the structure itself is here
  galleryImages?: Array<{ id: string; src: ImageMetadata }>; // Store raw image data, alt/captions come from i18n

  // keyFeatures will have their title/description translated
  keyFeatures?: Array<KeyFeature>; // Array of feature IDs, details from i18n

  // technologiesUsed can be more detailed than simple tags
  technologiesUsed?: Array<TechnologyDetail>; // More structured than tags
};

// Define the type for a project once its content is translated
export type TranslatedKeyFeature = KeyFeature & {
  title: string;
  description: string;
};

export type TranslatedGalleryImage = GalleryImage & {
  // alt and caption are already strings and will be provided by the translation file
  // src is already ImageMetadata
};

export type TranslatedProject = ProjectData & {
  // Existing translated fields
  title: string; // Main title of the project
  description: string; // Short description for cards/previews
  imageAltText: string; // Alt text for the main project image

  // New translated fields for the detailed page
  categoryText?: string; // Translated category
  dateText?: string; // Translated date display string
  detailedDescription?: string; // Longer description for the project detail page
  galleryImagesTranslated?: Array<{
    id: string;
    src: ImageMetadata; // Source of the gallery image, now strictly ImageMetadata
    alt: string; // Translated alt text
    caption: string; // Translated caption
  }>;
  keyFeaturesTranslated?: Array<TranslatedKeyFeature>; // Key features with translated titles/descriptions
  challenges?: string; // Description of challenges faced (translated)
  learnings?: string; // Key learnings from the project (translated)
  // technologiesUsed.name will be translated if needed, or could be kept as is if they are proper names
};

// Skills
export type Technology = {
  id: string; // e.g., 'react', 'angular', 'typescript' (will map to react-icons)
  name: string; // e.g., 'React', 'Angular', 'TypeScript'
};

export type SkillData = {
  id: string; // Unique identifier for the skill, used for i18n keys
  iconName: string; // Name of the Lucide icon
  technologies: Array<Technology>;
};

// Define the type for a skill once its content is translated
export type TranslatedSkill = SkillData & {
  title: string;
  description: string;
  // iconName is already part of SkillData
  // technologies is already part of SkillData
};
