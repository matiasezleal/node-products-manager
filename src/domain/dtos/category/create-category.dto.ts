export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly userId: string,
    public readonly available: boolean,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description, userId, available=false } = props;

    if (!name) return ['Name is required'];
    if (!userId) return ['UserId is required'];
    if (typeof available !== 'boolean') return ['Available must be a boolean or not provided'];
    return [undefined, new CreateCategoryDto(name, description, userId, available)];
  }
} 