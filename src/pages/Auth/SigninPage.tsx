import { signinSchema, type signinSchemaType } from "@/schemas/auth.schema";
import supabase from "@/supabase/supabase-client";
import { loadSettingsFromSupabase } from "@/utils/SettingsHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<signinSchemaType> = async (dataInput) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      ...dataInput,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setError("email", {
          type: "manual",
          message:
            "Please check your inbox and confirm your email before logging in.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await loadSettingsFromSupabase(userId);
    }

    return;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex flex-col gap-3"
    >
      <input
        type="email"
        {...register("email")}
        placeholder="Input your email"
        className="ring-dark-background/10 focus:ring-dark-background text-fluid-base w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
        required
      />
      {errors.email && (
        <p className="text-fluid-sm text-red-400">{errors.email?.message}</p>
      )}

      <input
        type="password"
        {...register("password")}
        placeholder="Input your password"
        className="ring-dark-background/10 focus:ring-dark-background text-fluid-base w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
        required
      />
      {errors.password && (
        <p className="text-fluid-sm text-red-400">{errors.password?.message}</p>
      )}
      {errors.root && (
        <p className="text-fluid-sm text-red-400">{errors.root?.message}</p>
      )}

      <button className="bg-dark-background hover:bg-dark-background/90 text-medium-light-background text-fluid-base w-full cursor-pointer rounded-lg p-3 transition-colors ease-in-out">
        Log in
      </button>
    </form>
  );
};

export default SigninPage;
