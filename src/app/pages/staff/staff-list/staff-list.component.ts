import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {StaffService} from '../../../shared/services';
import {Subscription} from 'rxjs/internal/Subscription';
import {StaffFilter} from '../../../shared/models/staff.model';

@Component({
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  @ViewChild('modalActividadCivica') modalActividadCivica: ElementRef;
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
      name: 'ci',
      displayName: 'CI',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'firstName',
      displayName: 'Nombres',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lastName',
      displayName: 'Apellidos',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'gender',
      displayName: 'Genero',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'nationality',
      displayName: 'Nacionalidad',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'email',
      displayName: 'E-mail',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'phone',
      displayName: 'Celular',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'address',
      displayName: 'Direccion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'speciality',
      displayName: 'Especialidad',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'profession',
      displayName: 'Profesion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
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
              private staffService: StaffService,
              private alertService: AlertService) {

    this.staffService.currentStaffFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(staffFilter: StaffFilter) {
    this.staffService.getAllStaff(staffFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.staffService.getStaffFilter();
    filter.page = (event.newPage) - 1;
    this.staffService.sendStaffFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.staffService.getStaffFilter();
    filter.sort = [event.column + ',' + state];
    this.staffService.sendStaffFilter(filter);
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
