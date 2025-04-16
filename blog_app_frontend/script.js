const API_BASE_URL = "http://127.0.0.1:3000/api/v1";

// Function to fetch all posts
async function getAllPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts.");
        const posts = await response.json();
        const postSection = document.getElementById("posts");
        postSection.innerHTML = ""; // Clear existing posts

        posts.forEach(post => {
            const postDiv = createPostElement(post);
            postSection.appendChild(postDiv);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Function to create a new post
async function createPost(content) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });
        if (response.ok) {
            await getAllPosts();
        } else {
            console.error("Error creating post:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

// Function to like a post
async function likePost(postId, likeButton) {
    try {
        const response = await fetch(`${API_BASE_URL}/likes/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId })
        });
        if (response.ok) {
            const likes = parseInt(likeButton.textContent.match(/\d+/)[0], 10) + 1;
            likeButton.textContent = `Like (${likes})`;
        }
    } catch (error) {
        console.error("Error liking post:", error);
    }
}

// Function to add a comment to a post
async function createComment(postId, commentInput, commentSection) {
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    try {
        const response = await fetch(`${API_BASE_URL}/comments/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, comment: commentText })
        });
        if (response.ok) {
            const commentPara = document.createElement("p");
            commentPara.textContent = commentText;
            commentSection.appendChild(commentPara);
            commentInput.value = "";
        }
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

// Utility function to create a post element
function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const contentPara = document.createElement("p");
    contentPara.textContent = post.content;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const likeButton = document.createElement("button");
    likeButton.textContent = `Like (${post.likes || 0})`;
    likeButton.addEventListener("click", () => likePost(post.id, likeButton));

    const commentSection = document.createElement("div");
    commentSection.classList.add("comments");

    const commentForm = document.createElement("form");
    commentForm.innerHTML = `
        <input type="text" placeholder="Add a comment..." required />
        <button type="submit">Comment</button>
    `;

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentInput = commentForm.querySelector("input");
        createComment(post.id, commentInput, commentSection);
    });

    actionsDiv.appendChild(likeButton);
    postDiv.appendChild(contentPara);
    postDiv.appendChild(actionsDiv);
    postDiv.appendChild(commentSection);
    postDiv.appendChild(commentForm);

    return postDiv;
}

// Event listener for creating posts
document.getElementById("postForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const postContent = document.getElementById("postContent").value.trim();
    if (postContent) {
        createPost(postContent);
        document.getElementById("postContent").value = "";
    }
});

// Fetch and display posts on page load
getAllPosts();
