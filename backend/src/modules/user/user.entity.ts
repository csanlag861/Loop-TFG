export class UserEntity {
  constructor(private readonly id: number) {}

  isOwner(owner_id: number): boolean {
    return this.id === owner_id;
  }
}
