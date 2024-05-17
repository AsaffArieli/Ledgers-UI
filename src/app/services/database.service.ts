import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { FunderModel, IDatabaseService, MerchantModel, OwnerModel, ProfileModel } from '../models/database';

//const URL = "http://3.145.48.237:5000";
const URL = "https://git-AsaffArieli.pythonanywhere.com";
const READ_URL = `${URL}/read`;
const INSERT_URL = `${URL}/insert/database`;
const DELETE_URL = `${URL}/delete`;
const READ_DATABASE_URL = `${URL}/read/database`;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  /**
   * RAM Memory for the service.
   * @property BehaviorSubject<IDatabaseService>
   */
  private databaseSubject = new BehaviorSubject<IDatabaseService>({
    merchants: [],
    owners: [],
    funders: [],
    selected: []
  });
  /**
   * Subscribable to service memory.
   * @property Observable<IDatabaseService>
   */
  private database$ = this.databaseSubject.asObservable();

  /**
   * Initial fetching of the database to RAM
   * @constructor
   */
  constructor(private http: HttpClient) {
    this.read();
  }

  /**
   * Gets the database interface.
   * @return Observable<IDatabaseService>
   */
  private get database(): Observable<IDatabaseService> {
    return this.database$.pipe(
      filter(database => !!database),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );
  }

  /**
   * Gets the data for the main search form.
   * @return Observable<ProfileModel[]>
   */
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

  /**
   * Gets the selected elements.
   * @return Observable<ProfileModel[]>
   */
  public get selected(): Observable<ProfileModel[]> {
    return this.database.pipe(
      filter(database => !!database.selected),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.selected) === JSON.stringify(curr.selected)),
      map(database => database.selected)
    );
  }

  /**
   * Sets the selected elements.
   * @param selected ProfileModel[]: new selected data.
   */
  public set selected(selected: ProfileModel[]) {
    const database = this.databaseSubject.getValue();
    database.selected = selected;
    this.databaseSubject.next(database);
  }

  /**
   * Returns the correspondennce data table from RAM.
   * @param table string: data table name to return. ['funders', 'merchants', 'owners']
   * @returns Observable<ProfileModel[]>
   */
  public dataStream(table: string): Observable<ProfileModel[]> {
    return this.database.pipe(
      map(database => database[table] ? database[table] : [])
    );
  }

  /**
   * Deletes the selected elements from database.
   * Resolved when all elements are deleted.
   * @returns Promise<void>
   */
  public async delete(): Promise<void> {
    const items = await firstValueFrom(this.selected);
    console.log(items)
    await Promise.all((items).map(item => 
      firstValueFrom(this.http.delete<any>(`${DELETE_URL}/${item.class}/${item.id}`))
    ));
  }
  
  /**
   * Fetch the database from server to RAM.
   * Resolved when all elements are fetched.
   * @returns Promise<void>
   */
  public async read(): Promise<void> {
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

  /**
   * Insert data to database.
   * Resolved when all data saved to database.
   * @param body Objects to insert to database.
   * @returns Promise<void>
   */
  public async insert(body: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post<any>(INSERT_URL, body));
    } catch (error) {
      console.error(error);
    }
  }
}
