import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { ParameterModel, ParserModel, SchemeModel } from '../models/parser';

//const URL = "http://3.145.48.237:5000";
const URL = "http://git-AsaffArieli.pythonanywhere.com";
const READ_PARSER_URL = `${URL}/read/parser`;
const INSERT_PARAMETERS_URL = `${URL}/insert/parameters`;

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private parserSubject = new BehaviorSubject<ParserModel>({
    schemes: [],
    keys: []
  });
  private parser$ = this.parserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.read();
  }

  private get parser(): Observable<ParserModel> {
    return this.parser$.pipe(
      filter(parser => !!parser),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    )
  }

  public get schemes(): Observable<SchemeModel[]> {
    return this.parser.pipe(
      filter(parser => !!parser.schemes),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.schemes) === JSON.stringify(curr.schemes)),
      map(parser => parser.schemes)
    )
  }

  public get keys(): Observable<ParameterModel[]> {
    return this.parser.pipe(
      filter(parser => !!parser.keys),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.keys) === JSON.stringify(curr.keys)),
      map(parser => parser.keys)
    )
  }

  public async read(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(READ_PARSER_URL));
      this.parserSubject.next({
        schemes: response.schemes,
        keys: response.keys
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async insert(data: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post<any>(INSERT_PARAMETERS_URL, {'parameters': data}));
    } catch (error) {
      console.error(error);
    }
  }
}
