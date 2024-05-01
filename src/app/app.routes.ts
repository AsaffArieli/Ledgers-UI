import { Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { ParserComponent } from './components/parser/parser.component';
import { ParserSchemesComponent } from './components/parser/schemes/parser-schemes.component';
import { ParserKeysComponent } from './components/parser/keys/parser-keys.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OverviewComponent } from './components/profile/overview/overview.component';
import { BankingComponent } from './components/profile/banking/banking.component';
import { BankingOverviewComponent } from './components/profile/banking/overview/banking-overview.component';
import { BankingSummaryComponent } from './components/profile/banking/summary/banking-summary.component';
import { UnderwritingComponent } from './components/profile/underwriting/underwriting.component';
import { GuidelinesComponent } from './components/profile/guidelines/guidelines.component';
import { KeysComponent } from './components/profile/keys/keys.component';

export const routes: Routes = [
    { path: 'database/:table', component: DatabaseComponent },
    { path: 'parser', component: ParserComponent, children: [
        { path: 'schemes', component: ParserSchemesComponent },
        { path: 'keys', component: ParserKeysComponent },
        { path: '**', redirectTo: 'schemes' }
    ] },
    { path: 'merchant/:id', component: ProfileComponent, children: [
        { path: 'overview', component: OverviewComponent},
        { path: 'underwriting', component: UnderwritingComponent},
        { path: 'cash flow', component: BankingComponent, children: [
            { path: 'overview', component: BankingOverviewComponent },
            { path: 'summary', component: BankingSummaryComponent },
            { path: '**', redirectTo: 'overview' }
        ] },
        { path: '**', redirectTo: 'overview' }
    ]},
    { path: 'owner/:id', component: ProfileComponent, children: [
        { path: 'overview', component: OverviewComponent},
        { path: '**', redirectTo: 'overview' }
    ]},
    { path: 'funder/:id', component: ProfileComponent, children: [
        { path: 'overview', component: OverviewComponent},
        { path: 'guidelines', component: GuidelinesComponent},
        { path: 'keys', component: KeysComponent},
        { path: '**', redirectTo: 'overview' }
    ]}
];
