import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'persianTime' })

export class PersianTimePipe implements PipeTransform {
    Months = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }
    transform(value: string): string {
        const date = new Date(Number(value));
        return date.getFullYear() + '/' + this.Months[date.getMonth()] + '/' + date.getDay() +
        ' @ ' + date.getHours() +
        ' : ' + date.getMinutes() +
        ' : ' + date.getSeconds() ;
    
    }
}