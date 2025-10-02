import Review from "../models/review.js";

// Create review
export async function createReview(req, res) {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user?.userId; // assuming auth middleware sets req.user

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const review = new Review({
      user: userId,
      productId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: "Error creating review", error: err });
  }
}

// Get all reviews (admin)
export async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find().populate("user", "firstname lastname email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
}

// Get reviews by product
export async function getReviewsByProduct(req, res) {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate("user", "firstname lastname");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product reviews", error: err });
  }
}

// Delete review (admin)
export async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err });
  }
}
