export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly userId: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description, userId } = props;

    if (!name) return ['Name is required'];
    if (!description) return ['Description is required'];
    if (!userId) return ['UserId is required'];

    return [undefined, new CreateCategoryDto(name, description, userId)];
  }
} 