import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { FunderModel, IDatabaseService, MerchantModel, OwnerModel, ProfileModel } from '../models/database';

//const URL = "http://3.145.48.237:5000";
const URL = "http://git-AsaffArieli.pythonanywhere.com";
const READ_URL = `${URL}/read`;
const INSERT_URL = `${URL}/insert/database`;
const DELETE_URL = `${URL}/delete`;
const READ_DATABASE_URL = `${URL}/read/database`;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private databaseSubject = new BehaviorSubject<IDatabaseService>({
    merchants: [],
    owners: [],
    funders: [],
    selected: []
  });
  private database$ = this.databaseSubject.asObservable();

  constructor(private http: HttpClient) {
    this.readDatabase();
  }

  private get database(): Observable<IDatabaseService> {
    return this.database$.pipe(
      filter(database => !!database),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );
  }

  public get data(): Observable<ProfileModel[]> {
    return this.database.pipe(
      filter(database => !!database.merchants && !!database.owners && !!database.funders),
      distinctUntilChanged((prev, curr) =>
        JSON.stringify(prev.merchants) === JSON.stringify(curr.merchants) &&
        JSON.stringify(prev.owners) === JSON.stringify(curr.owners) &&
        JSON.stringify(prev.funders) === JSON.stringify(curr.funders)
      ),
      map(database => [...database.funders, ...database.merchants, ...database.owners])
    );
  }

  public get funders(): Observable<FunderModel[]> {
    return this.database.pipe(
      filter(database => !!database.funders),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.funders) === JSON.stringify(curr.funders)),
      map(database => database.funders)
    );
  }

  public get selected(): Observable<ProfileModel[]> {
    return this.database.pipe(
      filter(database => !!database.selected),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.selected) === JSON.stringify(curr.selected)),
      map(database => database.selected)
    );
  }

  public set selected(selected: ProfileModel[]) {
    const database = this.databaseSubject.getValue();
    database.selected = selected;
    this.databaseSubject.next(database);
  }

  public dataStream(table: string): Observable<ProfileModel[]> {
    return this.database.pipe(
      map(database => database[table] ? database[table] : [])
    );
  }

  public async delete(): Promise<void> {
    const items = await firstValueFrom(this.selected);
    console.log(items)
    await Promise.all((items).map(item => 
      firstValueFrom(this.http.delete<any>(`${DELETE_URL}/${item.class}/${item.id}`))
    ));
  }

  public async readDatabase(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(READ_DATABASE_URL));
      this.databaseSubject.next({
        merchants: response.merchants.map(merchant => new MerchantModel(merchant)),
        owners: response.owners.map(owner => new OwnerModel(owner)),
        funders: response.funders.map(funder => new FunderModel(funder)),
        selected: []
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async insert(body: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post<any>(INSERT_URL, body));
    } catch (error) {
      console.error(error);
    }
  }
}
