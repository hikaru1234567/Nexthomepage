import { supabase } from "./supabase";

export const signUp = async (email: string, password: string, name: string) => {
  try {
    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("ユーザー登録に失敗しました");

    // ユーザーデータが確実にデータベースに反映されるまで待機

    // セッションの確認
    console.log(authData.user.id);
    const { data } = await supabase.auth.getUser();

    console.log(data);
    // プロフィール作成を試みる
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: "45684801-dc83-46fd-b9e1-0c3ece5b8260",
          name,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (profileError) {
      console.error("Profile creation error:", profileError);
      throw new Error("プロフィールの作成に失敗しました");
    }

    console.log(authData.user.id);

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
