import { CategoryModel } from "../../data";
import { CustomError, UserEntity } from "../../domain";
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
        
        const categoryAlreadyExists = await CategoryModel.findOne({ name: category.name });
        if( categoryAlreadyExists ) throw CustomError.badRequest('Category already exists');
        
        try {
            
            const newCategory = await CategoryModel.create(category);
            const response = CategoryEntity.fromObject(newCategory);
            return response;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError('Error creating category');
        }
    }

    async updateCategory(id: string, category: any): Promise<any> {
        return null;
    }

    async deleteCategory(id: string): Promise<any> {
        return null;
    }
}