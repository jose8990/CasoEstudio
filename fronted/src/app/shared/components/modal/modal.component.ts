import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ModalService} from "../../services";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('appModal') appModal;
  @Input() modalId: string;
  @Input() blocking = false;
  @Input() style: Object;
  @Output() open = new EventEmitter<any>();
  isOpen = false;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }
}
