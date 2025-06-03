import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CustomError } from "../../domain";

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
            res.json(category);
        } catch (error) {
            return this.handleError(res, error);
        }
    }
    getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getCategories();
            res.json(categories);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    createCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.json(category);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    updateCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.updateCategory(req.params.id, req.body);
            res.json(category);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.deleteCategory(req.params.id);
            res.json(category);
        } catch (error) {
            return this.handleError(res, error);
        }
    }
}