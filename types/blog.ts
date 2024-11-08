// types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}
