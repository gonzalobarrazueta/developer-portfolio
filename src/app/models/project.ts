import { Technology } from "./technology";

export interface Project {
  pageId: string;
  title: string;
  description: string;
  technologies: Array<Technology>;
  imageUrl: string;
  demo: string;
  github: string;
  live: string;
}
