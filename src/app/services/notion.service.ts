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
  private readonly notionEndpoint: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.BASE_URL;
    this.notionEndpoint = environment.NOTION_ENDPOINT;
  }

  getPages(): Observable<Pages> {
    return this.http.get<Pages>(`${this.baseUrl}/${this.notionEndpoint}`);
  }
}
