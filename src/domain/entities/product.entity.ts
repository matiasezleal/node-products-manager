export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public inStock: number,
    public categoryId: string,
    public userId: string,
    public available: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductEntity {
    const {
      id,
      _id,
      name,
      description,
      price,
      inStock,
      category,
      categoryId,
      user,
      userId,
      available,
      createdAt,
      updatedAt,
    } = object;

    return new ProductEntity(
      id || _id,
      name,
      description,
      Number(price),
      Number(inStock || 0),
      category?._id || category || categoryId,
      user?._id || user || userId,
      available ?? false,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }

  static fromJSON(json: string): ProductEntity {
    return this.fromObject(JSON.parse(json));
  }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      inStock: this.inStock,
      categoryId: this.categoryId,
      userId: this.userId,
      available: this.available,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateStock(quantity: number): void {
    const newStock = this.inStock + quantity;
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.inStock = newStock;
  }

  setPrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }
} 