import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = [
    {
      pil_degeri: 74,
      sicaklik: 21.5,
      nem: 50,
      tarih: 1734803782000,
      bolum: '1 Nolu Kapı',
    },
    {
      pil_degeri: 94,
      sicaklik: 23.9,
      nem: 63,
      tarih: 1734803782000,
      bolum: 'Yatak Odası',
    },
    {
      pil_degeri: 53,
      sicaklik: 23.8,
      nem: 65,
      tarih: 1734803782000,
      bolum: '1 Nolu Kapı',
    },
    {
      pil_degeri: 22,
      sicaklik: 19.8,
      nem: 33,
      tarih: 1734717382000,
      bolum: 'Yatak Odası',
    },
    {
      pil_degeri: 15,
      sicaklik: 20.1,
      nem: 48,
      tarih: 1734717382000,
      bolum: 'Salon',
    },
    {
      pil_degeri: 51,
      sicaklik: 24.3,
      nem: 60,
      tarih: 1734803782000,
      bolum: 'Çalışma Odası',
    },
    {
      pil_degeri: 32,
      sicaklik: 18.3,
      nem: 54,
      tarih: 1734717382000,
      bolum: 'Garaj',
    },
    {
      pil_degeri: 71,
      sicaklik: 22.6,
      nem: 64,
      tarih: 1734717382000,
      bolum: 'Salon',
    },
  ];

  getData() {
    return this.data;
  }
}
