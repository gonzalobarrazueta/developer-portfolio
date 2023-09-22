import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pages } from "../models/pages";

@Injectable({
  providedIn: 'root'
})
export class NotionService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.PROJECTS_URL;
  }

  getPages(): Observable<Pages> {
    return this.http.get<Pages>(`${this.baseUrl}/projects`);
  }
}
