import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import { FinancialsService } from './financials.service';
import { BankingConfigModel, FilterModel } from '../models/interfaces';
import { BalanceModel, FinancialsModel, StatementModel, TransactionModel } from '../models/financials';

@Injectable({
  providedIn: 'root'
})
export class BankingService  {

private statementsSubject = new BehaviorSubject<StatementModel[]>([]);
private activeStatementsSubject = new BehaviorSubject<StatementModel[]>([]);
public statements$ = this.statementsSubject.asObservable();
public activeStatements$ = this.activeStatementsSubject.asObservable();
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


constructor(private financialsService: FinancialsService) {}

public set config(config: any) {
  const tempConfig = this.ConfigSubject.getValue();
  Object.keys(config).forEach(key => { if (key in tempConfig) tempConfig[key] = config[key]; });
  this.ConfigSubject.next(tempConfig);
}

public get config(): Observable<BankingConfigModel> {
  return combineLatest([
    this.config$,
    this.financials
  ]).pipe(
    filter(([config]) => config !== null && Object.values(config).every(value => value !== null)),
    distinctUntilChanged(),
    map(([config, financials]) => { config.sections = financials.sections; return config; })
  )
}

public get filters(): Observable<FilterModel[]> {
  return this.config.pipe(
    filter(config => config !== null && Object.values(config).every(value => value !== null)),
    distinctUntilChanged((prev, curr) => prev.filters === curr.filters),
    map(config => config.filters)
  );
}

private get financials(): Observable<FinancialsModel> {
  return this.financialsService.financials
    .pipe(
      filter(financials => financials !== null && Object.values(financials).every(value => value !== null)),
      distinctUntilChanged(),
    )
}

public get statements(): Observable<StatementModel[]> {
  return combineLatest([
    this.financials,
    this.config
  ]).pipe(
    map(([financials, config]) => sortStatements(filterStatements(financials.statements, config.accounts, config.years, config.banks, config.view)))
  )
}

public set activeStatements(statements: StatementModel[]) {
  this.activeStatementsSubject.next(sortStatements(statements));
}

public get activeStatements(): Observable<StatementModel[]> {
  return combineLatest([
    this.activeStatements$,
    this.statements
  ]).pipe(
    filter(statements => statements !== null),
    map(([active, statements]) => active.filter(s => statements.includes(s)))
  )
}

get transactions(): Observable<TransactionModel[]> {
  return combineLatest([
    this.financials,
    this.activeStatements
  ]).pipe(
    distinctUntilChanged(),
    map(([financials, statements]) => financials.transactions.filter(t => statements.map(s => s.id).includes(t.statement_id)))
  );
}

get balances(): Observable<BalanceModel[]> {
  return combineLatest([
    this.financials,
    this.activeStatements
  ]).pipe(
    distinctUntilChanged(),
    map(([financials, statements]) => financials.balances.filter(b => statements.map(s => s.id).includes(b.statement_id)))
  );
}

get sections(): Observable<string[]> {
  return this.financials.pipe(
    map(financials => financials.sections)
  )
}

public dataStream(group: string, filters: FilterModel[]): Observable<TransactionModel[] | StatementModel[] | BalanceModel[]> {
  return combineLatest([
    this.activeStatements,
    this.transactions,
    this.balances,
    this.config
  ]).pipe(
    distinctUntilChanged(),
    map(([statements, transactions, balances, config]) => {
      switch (group) {
        case 'statements':
          return statements;
        case 'balances':
          return balances;
        case 'transactions':
        default:
          return sortTransactions(this.filterTransactions(transactions, filters), config.sort, config.order);
      }
    })
  );
}

getStatistics(): Observable<any> {
  return combineLatest([
    this.activeStatements,
    this.balances,
    this.transactions
  ]).pipe(
    filter(([statements, balances, transactions]) => statements !== null && balances !== null && transactions !== null),
    distinctUntilChanged(),
    map(([statements, balances, transactions]) => {
      return {
        deposits: {

        }
      };
    })
  );
}
/*
getDisplayedStats(): Observable<DisplayedStatisticsModel> {
  return combineLatest([
    this.activeStatements,
    this.balances,
    this.transactions
  ]).pipe(
    map(([statements, balances, transactions]) => new DisplayedStatisticsModel(transactions, balances, statements))
  );
}*/

public set isAllSelected(selected: boolean) {
  this.config = { isAllSelected: selected };
}

public get isAllSelected(): Observable<boolean> {
  return this.config.pipe(
    distinctUntilChanged((prev, curr) => prev.isAllSelected === curr.isAllSelected),
    map(config => config.isAllSelected)
  );
}

set view(view: number) {
  this.config = { view: view ? new Date(new Date().setMonth(new Date().getMonth() - view)) : new Date(0) };
}

public get accounts(): Observable<string[]> {
  return combineLatest([
    this.financials,
    this.config
  ]).pipe(
    map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, null, config.years, config.banks, config.view).map(s => s.account))))
  );
}

set accounts(accounts: string[]) {
  this.config = { accounts: accounts ? accounts : [] };
}

public get years(): Observable<number[]> {
  return combineLatest([
    this.financials,
    this.config
  ]).pipe(
    map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, config.accounts, null, config.banks, config.view).map(s => s.date.getFullYear()))))
  );
}

set years(years: number[]) {
  this.config = { years: years ? years : [] };
}

public get banks(): Observable<string[]> {
  return combineLatest([
    this.financials,
    this.config
  ]).pipe(
    map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, config.accounts, config.years, null, config.view).map(s => s.bank))))
  );
}

set banks(banks: string[]) {
  this.config = { banks: banks ? banks : [] };
}

public lineChartData(): Observable<any> {
  return this.balances.pipe(
    map(balances => balances.reduce((acc, balance) => {
      acc.dates.push(balance.date.toISOString().split('T')[0]);
      acc.balances.push(balance.balance);
      return acc;
    }, { dates: [], balances: [] }))
  );
}

public pieChartData(): Observable<number[]> {
  return this.balances.pipe(
    map(balances => balances.reduce((total, balance) => {
      total[0] += balance.stats.deposits.total;
      total[1] += balance.stats.withdrawals.total;
      total[2] += balance.stats.deposits.total;
      total[3] += balance.stats.payments.total;
      return total;
    }, [0, 0, 0, 0]))
  );
}

public filterTransactions(transactions: TransactionModel[], filters: FilterModel[]): TransactionModel[] {
  filters.forEach(filter => {
    if (filter && filter.filter && filter.active) {
      transactions = transactions.filter(t => Object.keys(t).some(key => {
        if (filter.column && filter.column !== key) return false;
        switch (filter.type) {
          case 'number':
            return compareNumbers(t[key], filter.filter, filter.operation);
          case 'date':
            return compareDates(t[key], filter.filter, filter.operation);
          case 'string':
          default: return (
            compareNumbers(t[key], filter.filter, filter.operation) ||
            compareStrings(t[key], filter.filter)
          );
        }
      }));
    }
  });
  return transactions;
}
}






function sortStatements(statements: StatementModel[]): StatementModel[] {
return statements ? statements.sort((a, b) => a.date.getTime() - b.date.getTime()) : [];
}

function filterStatements(statements: StatementModel[], accounts: string[], years: number[], banks: string[], view: Date): StatementModel[] {
return statements ? statements.filter(s =>
  (accounts && accounts.length ? accounts.includes(s.account) : true) &&
  (years && years.length ? years.includes(s.date.getFullYear()) : true) &&
  (banks && banks.length ? banks.includes(s.bank) : true) &&
  (view ? s.date >= view : true)
) : [];
}

function sortTransactions(transactions: TransactionModel[], sort: string, order: boolean): TransactionModel[] {
return transactions.sort((a, b) => order ? (a[sort] > b[sort] ? 1 : -1) : (a[sort] < b[sort] ? 1 : -1));
}

function compareStrings(a: any, b: any): boolean {
return a && b ? a.toString().replace(/\t/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().includes(
  b.toString().replace(/\t/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
) : false;
}

function compareNumbers(a: any, b: any, operator: string): boolean {

if (!isOnlyDigits(a) || !isOnlyDigits(b)) return false;

a = parseFloat(a);
b = parseFloat(b);

switch (operator) {
  case '>': return a > b;
  case '<': return a < b;
  case '<=': return a <= b;
  case '>=': return a >= b;
  case '=':
  default: return a === b;
}
}

function compareDates(a: any, b: any, operator: string): boolean {
if (!isValidDate(a) || !isValidDate(b)) return false;

a = new Date(a);
b = new Date(b);

return operator === '>' ? a > b
  : operator === '<' ? a < b
    : operator === '<=' ? a <= b
      : operator === '>=' ? a >= b
        : (
          a.getFullYear() === b.getFullYear() &&
          a.getMonth() === b.getMonth() &&
          a.getDate() === b.getDate()
        );
}

function isValidDate(d: any): boolean {
if (d instanceof Date) return !isNaN(d.getTime());
else if (typeof d === 'string') return !isNaN(Date.parse(d));
return false;
}

function isOnlyDigits(value: any): boolean {
if (typeof value === 'number') return !isNaN(value) && isFinite(value);
else if (typeof value === 'string') return /^-?\d+(\.\d+)?$/.test(value);
return false;
}

function calculateCV(numbers: number[]): number {
if (numbers.length === 0) return 0;

const mean = numbers.reduce((sum, amount) => sum + amount, 0) / numbers.length;
const variant = numbers.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / numbers.length
return Math.sqrt(variant) / mean;
}

function calculateAVG(numbers: number[]): number {
return numbers.length !== 0 ? numbers.reduce((sum, amount) => sum + amount, 0) / numbers.length : 0;
}

function calculateMIN(numbers: number[]) {
  return numbers
    .filter(num => num > 0)
    .reduce((min, num) => Math.min(min, num), Infinity) || 0;
}


function latestValueFrom(statements: Observable<StatementModel[]>) {
throw new Error('Function not implemented.');
}
