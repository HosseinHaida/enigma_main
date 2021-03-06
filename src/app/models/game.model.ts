import { ReferenceMission } from './reference-mission.model';

export class Game {
  constructor(
    public id: string,
    public uid: string,
    public name: string,
    public level: number,
    public playersLimit: number,
    public city: string,
    public region: string,
    public cost: string,
    public prize: string,
    public missions: ReferenceMission[],
    public photoPath: string
  ) { }
}
