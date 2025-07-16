import { signupSchema, type signupSchemaType } from "@/schemas/auth.schema";
import supabase from "@/supabase/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const SignupPage = () => {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signupSchemaType> = async (dataInput) => {
    setSuccess("");
    const { error } = await supabase.auth.signUp({
      email: dataInput.email,
      password: dataInput.password,
    });

    if (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
      return;
    }

    // Neutral, non-enumerable success message
    setSuccess(
      "If this email isn't already registered, we’ve sent a confirmation link. Otherwise, please try logging in.",
    );
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

      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm your password"
        className="ring-dark-background/10 focus:ring-dark-background text-fluid-base w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
        required
      />
      {errors.confirmPassword && (
        <p className="text-fluid-sm text-red-400">
          {errors.confirmPassword?.message}
        </p>
      )}

      {errors.root && (
        <p className="text-fluid-sm text-red-400">{errors.root?.message}</p>
      )}

      {success && <p className="text-fluid-sm text-green-600">{success}</p>}

      <button className="bg-dark-background hover:bg-dark-background/90 text-medium-light-background text-fluid-base w-full cursor-pointer rounded-lg p-3 transition-colors ease-in-out">
        Register
      </button>
    </form>
  );
};

export default SignupPage;
