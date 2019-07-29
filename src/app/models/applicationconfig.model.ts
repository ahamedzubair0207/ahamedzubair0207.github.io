import { Locale } from './locale.model';
import { TimeZone } from './timezone.model';
import { UnitOfMeassurement } from './unitOfMeassurement.model';

export class ApplicationConfiguration {
    locale: Array<Locale>;
    timeZone: Array<TimeZone>;
    unitOfMeassurement: Array<UnitOfMeassurement>;
}