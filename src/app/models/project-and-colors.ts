import { Project } from "./project";
import { Color } from "./color";

export interface ProjectAndColors {
  project: Project;
  colors: [Color, Color];
}
