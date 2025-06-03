import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {

    constructor(
       
    ) {}

    async getCategories(): Promise<any> {
        return null;
    }

    async getCategoryById(id: string): Promise<any> {
        return null;
    }

    async createCategory(category: CreateCategoryDto):Promise<any> {
        return null;
    }

    async updateCategory(id: string, category: any): Promise<any> {
        return null;
    }

    async deleteCategory(id: string): Promise<any> {
        return null;
    }
}