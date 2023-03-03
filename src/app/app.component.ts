import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentStep = 1;
  subscriptionForm: FormGroup;
  paymentForm: FormGroup;
  plans = [
    { name: 'Basic', price: 10, duration_months: 1 },
    { name: 'Standard', price: 20, duration_months: 3 },
    { name: 'Premium', price: 30, duration_months: 6 }
  ];
  storageOptions = [10, 50, 100];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      duration: [this.plans[0].duration_months, Validators.required],
      storage: [this.storageOptions[0], Validators.required],
      upfrontPayment: [false]
    });
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, ]],
      expirationDate: ['', [Validators.required, ]],
      securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });
  }

  goToNextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getTotalPrice(): number {
    const selectedPlan = this.plans.find(plan => plan.duration_months === this.subscriptionForm.value.duration);
    const storagePrice = this.subscriptionForm.value.storage / 10;
    const planPrice = selectedPlan.price * this.subscriptionForm.value.duration;
    let totalPrice = planPrice + storagePrice;
    if (this.subscriptionForm.value.upfrontPayment) {
      totalPrice *= 0.9;
    }
    return totalPrice;
  }

}
