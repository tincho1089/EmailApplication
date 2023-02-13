export interface BaseRepository<T> {
  findOne(id: string): Promise<T>;
  findAll?(): Promise<T[]>;
  findByName?(name: string): Promise<T[]>;
}
