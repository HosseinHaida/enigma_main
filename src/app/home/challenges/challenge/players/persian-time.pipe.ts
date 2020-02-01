import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'persianTime' })

export class PersianTimePipe implements PipeTransform {
    days = {
        1: 'دوشنبه',
        2: 'سه‌شنبه',
        3: 'چهارشنبه',
        4: 'پنج‌شنبه',
        5: 'جمعه',
        6: 'شنبه',
        7: 'یکشنبه'
    }
    transform(value: string): string {
        const date = new Date(Number(value));
        return this.days[date.getDay()] +
            ' @ ' + date.getSeconds() +
            ' : ' + date.getMinutes() +
            ' : ' + date.getHours()


    }
}