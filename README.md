📘 Personal Knowledge Base – Backend

A secure and scalable backend REST API for a Personal Knowledge Base application, enabling users to store, manage, and organize notes efficiently.
The system supports authentication, note lifecycle management, folders, pinning, archiving, and soft deletion (bin system) using modern backend technologies.

🚀 Project Overview

The Personal Knowledge Base Backend is designed to provide a robust server-side foundation for managing user-generated notes.
Each user has isolated access to their own data, enforced through JWT-based authentication and ownership-based authorization.

The backend follows MVC architecture and RESTful API principles, making it easy to extend with a frontend (web or mobile) in the future.

🔐 Authentication & Security Features

Secure user registration & login
Password hashing using bcrypt
Stateless authentication using JWT
Route protection using middleware
Ownership-based access control

Authentication Flow

User registers → password hashed and stored
User logs in → JWT token issued
Token sent in request headers
Middleware validates token
User gains access to protected routes

✨ Core Features

📝 Notes Management

Create, read, update, and delete notes
Pin / unpin important notes
Archive / unarchive notes
Soft delete notes (move to bin)
Restore notes from bin
Permanent deletion from bin

📂 Folder Management

Create folders
Assign notes to folders
Fetch folder-wise notes
Update and delete folders
Ownership protection for folders

🗑️ Bin System

Soft deletion of notes
Restore deleted notes
Permanent deletion support
