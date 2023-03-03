import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscriptionPlans = [
    {
      durationMonths: 3,
      priceUsdPerGb: 3
    },
    {
      durationMonths: 6,
      priceUsdPerGb: 2.5
    },
    {
      durationMonths: 12,
      priceUsdPerGb: 2
    }
  ];

  selectedDuration = this.subscriptionPlans[2].durationMonths;
  selectedGbAmount = this.subscriptionPlans[0].priceUsdPerGb;
  upfrontPayment = false;
  paymentData: any;

  constructor() { }

  getSelectedDuration() {
    return this.selectedDuration;
  }

  setSelectedDuration(duration: number) {
    this.selectedDuration = duration;
  }
  setPaymentData(paymentData: PaymentData): void {

    
    this.paymentData = paymentData;
  }
  getSelectedGbAmount() {
    return this.selectedGbAmount;
  }

  setSelectedGbAmount(gbAmount: number) {
    this.selectedGbAmount = gbAmount;
  }

  getUpfrontPayment() {
    return this.upfrontPayment;
  }

  setUpfrontPayment(upfront: boolean) {
    this.upfrontPayment = upfront;
  }

  getTotalPrice() {
    const pricePerGb = this.selectedGbAmount;
    const duration = this.selectedDuration;
    const totalGb = 5 * this.selectedGbAmount;
    let totalPrice = pricePerGb * totalGb * duration;

    if (this.upfrontPayment) {
      totalPrice = totalPrice * 0.9;
    }

    return totalPrice;
  }

  getPricePerGb() {
    return this.selectedGbAmount;
  }

  getSummary() {
    const duration = this.selectedDuration;
    const gbAmount = 5;
    const pricePerGb = this.selectedGbAmount;
    const totalPrice = this.getTotalPrice();
    const pricePerGbFormatted = pricePerGb.toFixed(2);
    const totalPriceFormatted = totalPrice.toFixed(2);

    return {
      duration,
      gbAmount,
      pricePerGbFormatted,
      totalPriceFormatted
    };
  }
}


interface PaymentData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}




