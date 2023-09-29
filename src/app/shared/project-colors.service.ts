import { Injectable } from '@angular/core';
import { Color } from "../models/color";

@Injectable({
  providedIn: 'root'
})
export class ProjectColorsService {

  public projectColors: Array<[Color, Color]> = [
    [{
      rgb: { red: 162, green: 230, blue: 77 },
      opacity: 0.42
    },
    {
      rgb: { red: 80, green: 210, blue: 19 },
      opacity: 0.56
    }],
    [{
      rgb: { red: 234, green: 118, blue: 53 },
      opacity: 0.52
    },
    {
      rgb: { red: 253, green: 228, blue: 99 },
      opacity: 0.77
    }],
    [{
      rgb: { red: 23, green: 210, blue: 199 },
      opacity: 0.42
    },
    {
      rgb: { red: 57, green: 243, blue: 75 },
      opacity: 0.56
    }]
  ]

  constructor() { }

  formatColorToRGBA(color: Color): string {
    return `rgba(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue}, ${color.opacity})`;
  }
}
