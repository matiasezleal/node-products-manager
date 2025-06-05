export class CategoryDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly available: boolean,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): CategoryDto {
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

    return new CategoryDto(
      id || _id,
      name,
      description,
      available ?? false,
      user?._id || user || userId,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }

  static fromJSON(json: string): CategoryDto {
    return this.fromObject(JSON.parse(json));
  }

  toJSON(): object {
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