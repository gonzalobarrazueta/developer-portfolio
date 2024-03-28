import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pages } from "../models/pages";

@Injectable({
  providedIn: 'root'
})
export class NotionService {

  constructor(private http: HttpClient) {
  }

  getPages(): Observable<Pages> {
    return this.http.get<Pages>(`${environment.BASE_URL}/${environment.NOTION_ENDPOINT}`);
  }
}
