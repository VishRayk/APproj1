<?php

session_start();
if (!isset($_SESSION["user"])) {
   header("Location: login.php");
}

require 'database.php';

// Ensure the user is logged in before allowing them to submit a review


$user_name = $_SESSION["user"];  // Logged-in user's name

// Fetch existing reviews
$result = $conn->query("SELECT * FROM reviews ORDER BY created_at DESC");

// Handle form submission for new reviews
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $review_text = trim($_POST['review_text']);
    $rating = (int)$_POST['rating'];

    if (empty($review_text) || $rating < 1 || $rating > 5) {
        $error = "Please provide a valid review and rating (1-5).";
    } else {
        $stmt = $conn->prepare("INSERT INTO reviews (user_name, review_text, rating) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $user_name, $review_text, $rating);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $success = "Review submitted successfully!";
        } else {
            $error = "An error occurred while submitting your review.";
        }

        $stmt->close();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Reviews</title>
    <link rel="stylesheet" href="review.css">
</head>
<body>
    <div class="container">
        <a href="index.html">Game Galaxy</a>
        <a href="logout.php" class="btn btn-warning">Logout</a>
    </div>
    <h1>Game Reviews</h1>

    <?php if ($result->num_rows > 0): ?>
        <div class="review-list">
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="review-item">
                    <h2><?php echo htmlspecialchars($row['user_name']); ?> (Rating: <?php echo $row['rating']; ?>)</h2>
                    <p><?php echo nl2br(htmlspecialchars($row['review_text'])); ?></p>
                    <small>Submitted on: <?php echo htmlspecialchars($row['created_at']); ?></small>
                </div>
            <?php endwhile; ?>
        </div>
    <?php else: ?>
        <p>No reviews yet. Be the first to submit one!</p>
    <?php endif; ?>
    
    <!-- Section to post a new review -->
    <h2>Post a Review</h2>
    <?php if (isset($error)): ?>
        <div class="error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    <?php if (isset($success)): ?>
        <div class="success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
    
    <form action="review.php" method="POST">
        <div>
            <label for="review_text">Your Review:</label>
            <textarea name="review_text" id="review_text" required></textarea>
        </div>
        <div>
            <label for="rating">Rating (1-5):</label>
            <input type="number" name="rating" id="rating" min="1" max="5" required>
        </div>
        <button type="submit">Submit Review</button>
    </form>
</body>
</html>
