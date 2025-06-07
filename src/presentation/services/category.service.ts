import { CategoryModel } from "../../data";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { CategoryDto } from "../../domain/dtos/category/category.dto";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {

    constructor(
       
    ) {}

    async getCategories(page: any, limit: any): Promise<PaginationDto | []> {
        const [errorMessage, paginationDto] = PaginationDto.create({ page, limit });
        if( errorMessage ) throw CustomError.badRequest(errorMessage);

        const total = await CategoryModel.countDocuments();
        
        const categories = await CategoryModel.find()
            .skip((paginationDto!.page - 1) * paginationDto!.limit)
            .limit(paginationDto!.limit);
        if(categories.length === 0) return [];
        paginationDto!.setData(categories.map(category => CategoryDto.fromObject(category)));
        paginationDto!.setTotalPages(total);
        return paginationDto!;
    }

    async getCategoryById(id: string): Promise<CategoryDto> {
        const category = await CategoryModel.findById(id);
        if( !category ) throw CustomError.notFound('Category not found');
        return CategoryDto.fromObject(category);
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

    async updateCategory(id: string, category: CategoryDto): Promise<any> {
        try {
            const categoryToUpdate = await CategoryModel.findById(id);
            if( !categoryToUpdate ) throw CustomError.notFound('Category not found');
            categoryToUpdate.name = category.name;
            categoryToUpdate.description = category.description;
            categoryToUpdate.available = category.available;
            await categoryToUpdate.save();
            return CategoryDto.fromObject(categoryToUpdate);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError('Error updating category');
        }
    }

    async deleteCategory(id: string): Promise<any> {
        try {
            const categoryToDelete = await CategoryModel.findById(id);
            if( !categoryToDelete ) throw CustomError.notFound('Category not found');
            await categoryToDelete.deleteOne();
            return CategoryDto.fromObject(categoryToDelete);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError('Error deleting category');
        }
    }
}