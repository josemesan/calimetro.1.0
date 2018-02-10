import { TablaTrenesService } from '../../entities/tabla-trenes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { TablaTrenes } from '../../entities/tabla-trenes';
import {Principal} from '../../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    currentAccount: any;
    private desde: string;
    private hasta: string;
    eventSubscriber: Subscription;
    subscription: Subscription;
    private tablaTrenes: TablaTrenes[];

    constructor(
        private tablaTrenesService: TablaTrenesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private principal: Principal
    ) {

    }

    ngOnInit() {
        this.loadFecha();
        this.registerChangeInTablaTrenes();
    }

    loadFecha() {
        this.tablaTrenesService.queryFecha(this.desde + ' 06:00').subscribe(
            (res: HttpResponse<TablaTrenes[]>) => {
                this.tablaTrenes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    registerChangeInTablaTrenes() {
        this.eventSubscriber = this.eventManager.subscribe('tablaTrenesListModification', (response) => this.loadFecha());
    }
}
