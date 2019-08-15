import { ToastrService } from 'ngx-toastr';


export class Toaster {
    constructor(private toastr: ToastrService) { }

    onSuccess(message: string, header: string) {
        this.toastr.success(message, header);
    }

    onFailure(message: string, header: string) {
        this.toastr.error(message, header);
    }
}