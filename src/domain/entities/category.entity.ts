export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public available: boolean,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): CategoryEntity {
    const {
      id,
      _id,
      name,
      description,
      available,
      user,
      userId,
      createdAt,
      updatedAt,
    } = object;

    return new CategoryEntity(
      id || _id,
      name,
      description,
      available ?? false,
      user?._id || user || userId,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }

  static fromJSON(json: string): CategoryEntity {
    return this.fromObject(JSON.parse(json));
  }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      available: this.available,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 