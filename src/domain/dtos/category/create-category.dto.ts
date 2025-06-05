export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly user: string,
    public readonly available: boolean,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description,user, available=false } = props;
    console.log(props);
    if (!name) return ['Name is required'];
    if (!user) return ['User is required'];
    
    //if (typeof available !== 'boolean') return ['Available must be a boolean or not provided'];
    return [undefined, new CreateCategoryDto(name, description, user.id, available)];
  }
} 