import { supabase } from "./supabase";

export const signUp = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // メタデータとしてfull_nameを追加
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("ユーザー登録に失敗しました");

    return authData;
  } catch (error) {
    console.error("SignUp error:", error);
    if (error instanceof Error) {
      if (error.message.includes("duplicate key")) {
        throw new Error("このメールアドレスは既に登録されています");
      }
      throw error;
    }
    throw new Error("サインアップ処理中にエラーが発生しました");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // エラーメッセージを具体的に
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("メールアドレスまたはパスワードが正しくありません");
      }
      throw error;
    }

    if (!data.user) {
      throw new Error("ログインに失敗しました");
    }

    return data;
  } catch (error) {
    console.error("SignIn error:", error);
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
