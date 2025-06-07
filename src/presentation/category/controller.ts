import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CustomError, PaginationDto } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}
    private handleError(res: Response, error: unknown) {

        if( error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

    getCategoryById = async (req: Request, res: Response) => {  
        try {
            const category = await this.categoryService.getCategoryById(req.params.id);
            return res.json(category);
        } catch (error) {
            return this.handleError(res, error);
        }
    }
    getCategories = async (req: Request, res: Response) => {
        const { page=1, limit=10 } = req.query;


        try {
            const categories = await this.categoryService.getCategories(page, limit);
            return res.status(200).json(categories);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    createCategory = async (req: Request, res: Response) => {
        console.log(req.body.user);
        const [errorMessage, categoryDto] = CreateCategoryDto.create(req.body);
        if( errorMessage ) return res.status(400).json({
            message: errorMessage
        });
        
        this.categoryService.createCategory(categoryDto!).then(category => {
            return res.status(201).json({
                category: category,
                message: 'Category created successfully'
            });
        }).catch((error) => {
            return this.handleError(res, error);
        });
        /*
        try {
            const categoryCreated = await this.categoryService.createCategory(categoryDto!);
            return res.status(201).json({
                category: categoryCreated,
                message: 'Category created successfully'
            });
        } catch (error) {
            //return this.handleError(res, error);
            console.log('pasa por error controller', error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }*/
    }

    updateCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.updateCategory(req.params.id, req.body);
            return res.status(200).json({
                category: category,
                message: 'Category updated successfully'
            });
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.deleteCategory(req.params.id);
            return res.status(200).json({
                category: category,
                message: 'Category deleted successfully'
            });
        } catch (error) {
            return this.handleError(res, error);
        }
    }
}