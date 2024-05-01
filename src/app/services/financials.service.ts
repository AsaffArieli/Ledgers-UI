import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, map } from 'rxjs';
import { FinancialsModel, StatementModel, TransactionModel } from '../models/financials';
import { BankingConfigModel } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {
  
  private financialsSubject = new BehaviorSubject<FinancialsModel>(null);
  private financials$ = this.financialsSubject.asObservable();
  private ConfigSubject = new BehaviorSubject<BankingConfigModel>({
    sort: 'date',
    order: true,
    group: 'statements',
    filters: [],
    sections: [],
    isAllSelected: true,
    accounts: [],
    years: [],
    banks: [],
    view: new Date(0)
  });
  public config$ = this.ConfigSubject.asObservable();

  constructor() {}

  public set financials(financials: FinancialsModel) {
    this.financialsSubject.next(financials);
  }

  public get financials(): Observable<FinancialsModel> {
    return this.financials$.pipe(
      filter(financials => !!financials),
    );
  }

  public get statements(): Observable<StatementModel[]> {
    return this.financials.pipe(
      filter(financials => !!financials.statements),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.statements) === JSON.stringify(curr.statements)),
      map(financials => financials.statements)
    );
  }

  public get transactions(): Observable<TransactionModel[]> {
    return this.financials.pipe(
      filter(financials => !!financials.transactions),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.transactions) === JSON.stringify(curr.transactions)),
      map(financials => financials.transactions)
    );
  }

  public get accounts(): Observable<string[]> {
    return this.financials.pipe(
      filter(financials => !!financials.accounts),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.accounts) === JSON.stringify(curr.accounts)),
      map(financials => financials.accounts)
    );
  }

  public get years(): Observable<number[]> {
    return this.financials.pipe(
      filter(financials => !!financials.years),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.years) === JSON.stringify(curr.years)),
      map(financials => financials.years)
    );
  }

  public get banks(): Observable<string[]> {
    return this.financials.pipe(
      filter(financials => !!financials.banks),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.banks) === JSON.stringify(curr.banks)),
      map(financials => financials.banks)
    );
  }
}
