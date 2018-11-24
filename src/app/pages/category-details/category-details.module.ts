import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {CategoryDetailsComponent} from './category-details.component';
import {SharedModule} from '../../shared/shared.module';
import {ProductService} from '../../shared/service/product.service';
import {NgBusyModule} from 'ng-busy';

export const routes: Routes = [
  {path: '', component: CategoryDetailsComponent}
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    NgbPaginationModule,
    RouterModule.forChild(routes),
    NgBusyModule
  ],
  declarations: [
    CategoryDetailsComponent
  ],
  providers: [
    ProductService
  ]
})
export class CategoryDetailsModule {
}
