import {Injectable} from "@angular/core";
import {ModalComponent} from "../components";

@Injectable()
export class ModalService {
  private modals: Array<ModalComponent>;
  private data: any;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: ModalComponent): void {
    const modal = this.findModal(newModal.modalId);

    // Delete existing to replace the modal
    if (modal) {
      this.modals.splice(this.modals.indexOf(modal));
    }

    this.modals.push(newModal);
  }

  open(modalId: string, data: any): void {
    const modal = this.findModal(modalId);

    if (modal) {
      modal.isOpen = true;
      modal.appModal.show();
      modal.open.emit({
        data: data
      })
      this.data = data;
    }
  }

  close(modalId: string, checkBlocking = false): void {
    const modal = this.findModal(modalId);

    if (modal) {
      if (checkBlocking && modal.blocking) {
        return;
      }

      modal.isOpen = false;
      modal.appModal.hide();
      this.data = null;
    }
  }

  getData(): any {
    return this.data;
  }

  private findModal(modalId: string): ModalComponent {
    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}
