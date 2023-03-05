import { Category } from '../models/category.model.js'
import asyncHandler from 'express-async-handler'
import errorFunction from '../utils/errorFunction.js'

const categoriesController = {
    // create category
    addCategory: asyncHandler(async (req, res)=> {
        try { 
            const category = await Category.create(req.body);
            res.status(201).json(errorFunction(false, 201, 'Created category successfully', category))
        } catch (error) {
            console.log(error)
            res.status(400).json(errorFunction(true, 400, 'Bad Request'));
        }
    }),
    // get all categories
    getCategories: asyncHandler(async (req, res)=> {
        try { 
            const categories = await Category.find().select('title posts').populate(
                "posts",
                "_id title images status price");
            res.status(200).json(errorFunction(false, 200, 'Categories fetched successfully', categories))
        } catch (error) {
            console.log(error)
            res.status(400).json(errorFunction(true, 400, 'Bad Request'));
        }
    }),
    // get category by id
    getCategoryById: asyncHandler(async (req, res)=> {
        try { 
            const category = await Category.findById(req.params.id);
            res.status(200).json(errorFunction(false, 200, 'Category fetched successfully', category))
        } catch (error) {
            console.log(error)
            res.status(400).json(errorFunction(true, 400, 'Bad Request'));
        }
    }),
    // update category by id
    updateCategoryById: asyncHandler(async (req, res)=> {
        try { 
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(errorFunction(false, 200, 'Category updated successfully', category))
        } catch (error) {
            console.log(error)
            res.status(400).json(errorFunction(true, 400, 'Bad Request'));
        }
    }),
    // delete category by id
    deleteCategoryById: asyncHandler(async (req, res)=> {
        try { 
            const category = await Category.findByIdAndDelete(req.params.id);
            res.status(200).json(errorFunction(false, 200, 'Category deleted successfully', category))
        } catch (error) {
            console.log(error)
            res.status(400).json(errorFunction(true, 400, 'Bad Request'));
        }
    })
}

export default categoriesController