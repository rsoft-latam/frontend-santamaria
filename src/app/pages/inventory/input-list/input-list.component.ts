import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PatientService} from '../../../shared/services';
import {PatientFilter} from '../../../shared/models/patient.model';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss']
})
export class InputListComponent implements OnInit {

  filtersColumns: any;

  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  actividadCivica: any;

  subscriptionTable: Subscription;
  totalData: number;
  pageSize: number;
  page: number;
  data: any = [];

  headersColumns: any = [
    {
      name: 'id',
      displayName: 'Id',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },

    {
      name: 'firstName',
      displayName: 'Nombre de Insumo:',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lastName',
      displayName: 'Marca del Insumo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'gender',
      displayName: 'Tipo de Insumo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },



    {
      name: 'birthdate',
      displayName: 'Fecha de Vencimiento',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'date'
    },
    {
      name: '',
      displayName: 'Precio de Insumo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'number'
    },
    {
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actions'
    }
  ];

  constructor(private modalService: NgbModal,
              private patientService: PatientService,
              private alertService: AlertService) {

    this.patientService.currentPatientFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(patientFilter: PatientFilter) {
    this.patientService.getAllPatients(patientFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.patientService.getPatientFilter();
    filter.page = (event.newPage) - 1;
    this.patientService.sendPatientFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.patientService.getPatientFilter();
    filter.sort = [event.column + ',' + state];
    this.patientService.sendPatientFilter(filter);
  }

  submit(form) {
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
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
    if (this.textButton === 'Crear') {
      this.actividadCivica = null;
    }
  }

  closeModal() {
    this.modal.close();
  }

  clickButtonRow(event) {
    /*if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar la actividad civica ?'}, isConfirm => {
        if (isConfirm.value) {
          this.actividadCivicaService.deleteActividadCivica(event.item.id)
            .pipe(finalize(() => this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter())))
            .subscribe(
              res => this.alertService.showSuccess({html: 'actividad civica eliminada exitosamente.'}),
              err => this.alertService.showError({html: 'ocurrio un error al eliminar el actividad civica.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modalActividadCivica, 'Editar Actividad Civica', 'Editar');
      this.actividadCivica = event.item;
    }*/
  }
}
