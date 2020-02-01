export class Mission {
  constructor(
    public id: string,
    public level: number,
    public name: string,
    public photoPath: string,
    public script: string,
    public answered: []
  ) { }
}

