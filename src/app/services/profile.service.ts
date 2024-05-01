import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom } from 'rxjs';
import { FinancialsService } from './financials.service';
import { FunderModel, MerchantModel, OwnerModel, ProfileModel } from '../models/database';
import { FinancialsModel } from '../models/financials';

//const URL = "http://3.145.48.237:5000";
const URL = "http://git-AsaffArieli.pythonanywhere.com";
const READ_URL = `${URL}/read`;
const DELETE_URL = `${URL}/delete`;
const READ_FINANCIALS = `${URL}/read/financials`;
const PARSE_STATEMENTS_URL = `${URL}/insert/statements`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<ProfileModel>(null);
  private profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient, private financialsService: FinancialsService) {}

  public get profile(): Observable<ProfileModel> {
    return this.profile$.pipe(
      filter(profile => !!profile),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );
  }

  public async read(profile: string, id: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(`${READ_URL}/${profile}s/${id}`));
      switch (profile) {
        case 'merchant':
          this.profileSubject.next(new MerchantModel(response.merchants[0]));
          this.readFinancials(id);
          break;
        case 'owner':
          this.profileSubject.next(new OwnerModel(response.owners[0]));
          break;
        case 'funder':
          this.profileSubject.next(new FunderModel(response.funders[0]));
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(element: string, ids: string[]): Promise<void> {
    const deletePromises = ids.map(id =>
      firstValueFrom(this.http.delete<any>(`${DELETE_URL}/${element}/${id}`))
    );
    await Promise.all(deletePromises)
      .then(() => this.readFinancials(this.profileSubject.getValue().id));
  }

  public async readFinancials(id: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(`${READ_FINANCIALS}/${id}`));
      this.financialsService.financials = new FinancialsModel(response);
    } catch (error) {
      console.error(error);
    }
  }

  public async parseStatements(statements: FileList): Promise<void> {
    try {
      const base64Statements = await convertPdfFilesToBase64(statements);
      const id = this.profileSubject.getValue().id;
      const response = await firstValueFrom(this.http.post<any>(`${PARSE_STATEMENTS_URL}/${id}`, { statements: base64Statements }));
      this.readFinancials(id);
    } catch (error) {
      console.error(error);
    }
  }

  private async convertPdfFilesToBase64(files: FileList): Promise<string[]> {
    const promises = Array.from(files).map(file => {
      if (file.type !== 'application/pdf') {
        return Promise.reject("File is not a PDF");
      }
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  }
}

async function convertPdfFilesToBase64(files: FileList): Promise<string[]> {
  const promises = Array.from(files).map(file => {
    if (file.type !== 'application/pdf') {
      return Promise.reject("File is not a PDF");
    }
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  });
  return Promise.all(promises);
}
