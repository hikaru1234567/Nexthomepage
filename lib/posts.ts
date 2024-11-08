import { PrismaClient } from "@prisma/client";
import { cache } from "react";

// シングルトンとしてPrismaClientを初期化
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getPosts = cache(
  async (searchQuery?: string, page: number = 1, limit: number = 10) => {
    try {
      const where = searchQuery
        ? {
            OR: [
              { title: { contains: searchQuery, mode: "insensitive" } },
              { content: { contains: searchQuery, mode: "insensitive" } },
            ],
          }
        : {};

      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.post.count({ where }),
      ]);

      return {
        posts,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }
);

export const getPost = cache(async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
});

// 新規投稿作成用の関数を追加
export async function createPost(
  authorId: string,
  data: { title: string; content: string }
) {
  try {
    return await prisma.post.create({
      data: {
        ...data,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}

// 投稿更新用の関数を追加
export async function updatePost(
  id: string,
  authorId: string,
  data: { title?: string; content?: string }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== authorId) {
      throw new Error("Unauthorized");
    }

    return await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
}
