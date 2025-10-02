import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview); // user creates review
reviewRouter.get("/", getAllReviews); // admin fetch all
reviewRouter.get("/product/:productId", getReviewsByProduct); // fetch reviews for a product
reviewRouter.delete("/:id", deleteReview); // admin deletes

export default reviewRouter;
