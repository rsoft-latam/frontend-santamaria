import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {InventoryService, ProviderService} from '../../../shared/services';
import {Subscription} from 'rxjs/internal/Subscription';
import {ProviderFilter} from '../../../shared/models/provider';
import {finalize} from 'rxjs/operators';
import {Inventory} from '../../../shared/models/inventory';

@Component({
  templateUrl: './list-inventories.component.html',
  styleUrls: ['./list-inventories.component.scss']
})
export class ListInventoriesComponent implements OnInit {

  @ViewChild('modalActividadCivica') modalActividadCivica: ElementRef;
  @ViewChild('modalRegistryDetails') modalRegistryDetails: ElementRef;

  filtersColumns: any;
  registryDetails: any = [];


  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  actividadCivica: any;

  subscriptionTable: Subscription;
  totalData: number;
  pageSize: number;
  page: number;
  data: any = [];

  inventorisDetails: Inventory [] = [];
  products = [];
  registry = {
    company: '',
    description: '',
    observation: '',
    phone: '',
    type: '',
    idBranch: '',
    name: ''
  };

  headersColumns: any = [
    {
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actionsDeleteView'
    },
    {
      name: 'company',
      displayName: 'Compañía',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'name',
      displayName: 'Nombre proveedor',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'date',
      displayName: 'Fecha',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'date'
    },
    {
      name: 'description',
      displayName: 'Descripción',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'observation',
      displayName: 'Observación',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'phone',
      displayName: 'Teléfono',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'type',
      displayName: 'Tipo',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    }
  ];

  constructor(private modalService: NgbModal,
              private providerService: ProviderService,
              private inventoryService: InventoryService,
              private alertService: AlertService) {

    this.providerService.currentProviderFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(providerFilter: ProviderFilter) {
    this.providerService.getAllProviders(providerFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.providerService.getProviderFilter();
    filter.page = (event.newPage) - 1;
    this.providerService.sendProviderFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.providerService.getProviderFilter();
    filter.sort = [event.column + ',' + state];
    this.providerService.sendProviderFilter(filter);
  }

  submitEstudiante(form) {
    /*const actividadCivica = {
      'id': this.actividadCivica ? this.actividadCivica.id : null,
      'cronograma': form.value.cronograma,
      'descripcion': form.value.descripcion,
      'fecha': form.value.fecha,
      'nombre': form.value.nombre
    };
    if (this.textButton === 'Crear') {
      this.actividadCivicaService.createActividadCivica(actividadCivica)
        .pipe(finalize(() => {
          this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'actividad civica creada exitosamente.'})
        );
    } else if (this.textButton === 'Editar') {
      this.actividadCivicaService.modifyActividadCivica(actividadCivica)
        .pipe(finalize(() => {
          this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'actividad civica modificada exitosamente.'})
        );
    }*/
  }

  openModal(content, titleModal, textButton) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg', centered: true});
    this.titleModal = titleModal;
    this.textButton = textButton;
  }

  closeModal() {
    this.modal.close();
  }

  addInventory() {
    this.inventorisDetails.push(new Inventory);
  }

  removeInventory(inventory) {
    if (this.inventorisDetails.length > 1) {
      this.inventorisDetails = this.inventorisDetails.filter(item => item !== inventory);
      inventory.selected = true;
    }
    inventory.selected = true;
  }


  clickButton(event) {
    if (event.description === 'view') {
      this.inventoryService.getAllByIdProvider(event.item.id).subscribe(
        res => {
          this.registryDetails = res.body;
          this.modal = this.modalService.open(this.modalRegistryDetails, {backdrop: 'static', size: 'lg', centered: true});
        }, () => this.alertService.showError({html: 'Ocurrio un error al mostrar el detalle de inventario.'})
      );
    } else if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'Esta seguro de eliminar el inventario?'}, () => {
        this.providerService.deleteProvider(event.item.id).pipe(finalize(() => {
          this.providerService.sendProviderFilter(new ProviderFilter);
        })).subscribe(
          () => this.alertService.showSuccess({html: 'inventario eliminado exitosamente.'}),
          () => this.alertService.showError({html: 'ocurrio un error al eliminar el producto.'})
        );
      });
    }
  }

  getProducts(filter) {
    if (this.products.length > 0) {
      return this.products.filter((v) => {
        if (v && filter !== '' && filter !== undefined && filter !== null) {
          if (v.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && filter.length > 2) {
            return true;
          }
        }
        return false;
      });
    }
  }

  saveInventories(inventoris) {
    /*this.providerService.createProvider(this.registry).subscribe(
      resProvider => {
        inventoris.map(item => item.idProvider = resProvider.body.id);
        inventoris.map(item => {
          this.inventoryService.postInventory(item).subscribe(
            resInventory => {
              item.product.stock = parseFloat(item.product.stock) + parseFloat(item.quantity);
              this.productService.modifyProduct(item.product).subscribe(
                resProduct => this.alertService.showSuccess({html: 'Inventario creado exitosamente.'})
              );
            },
            errInventory => this.alertService.showError({html: 'Ocurrio un error al crear inventario.'})
          );
        });
        this.providerService.sendProviderFilter(new ProviderFilter());
      }
    );
    this.closeModal();
    this.registry = {
      company: '',
      description: '',
      observation: '',
      phone: '',
      type: '',
      idBranch: '',
      name: ''
    };
    this.inventorisDetails = [];
    this.addInventory();*/
  }
}
