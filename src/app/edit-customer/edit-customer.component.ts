import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../services/customer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "../model/customer.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  editCustomerFormGroup: FormGroup;
  customer!: Customer;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editCustomerFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const customerId = +this.route.snapshot.params['id'];
    if (customerId) {
      this.customerService.getCustomer(customerId).subscribe({
        next: (customerData) => {
          this.customer = customerData;
          this.editCustomerFormGroup.patchValue({
            name: this.customer.name,
            email: this.customer.email
          });
        },
        error: (err) => {
          console.error('Impossible d&obtenir un client:', err);
          this.router.navigate(['/admin/customers']);
        }
      });
    } else {
      console.error('ID du Client invalide');
      this.router.navigate(['/admin/customers']);
    }
  }

  handleUpdateCustomer(): void {
    if (this.editCustomerFormGroup.valid) {
      const updatedCustomer = { ...this.customer, ...this.editCustomerFormGroup.value };
      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: () => {
          //alert
          Swal.fire({
            title: 'succès!',
            text: 'Client mis à jour avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          this.router.navigate(['/admin/customers']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du client:', error);
          alert('Échec de la mise à jour du client.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/admin/customers']);
  }
}
