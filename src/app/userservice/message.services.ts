import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class MessageService  {
    constructor(public toastr: ToastsManager    ) {

    }

    showSuccess(msessage: any) {
        this.toastr.success(msessage);
    }

    showError(msessage: any) {
        this.toastr.error(msessage);
    }

    showWarning(msessage: any) {
        this.toastr.warning(msessage);
    }

    showInfo(msessage: any) {
        this.toastr.info(msessage);
    }

}
