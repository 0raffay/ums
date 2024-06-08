import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/Form";

import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/LoginSchema";

//Slice
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

//api:
import { useUserLoginMutation } from "@/api/Auth/authApi";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "@/router/routes";

import loginImage from "@/assets/images/login-image.jpg"

export default function Login({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [userLogin, { data, isError, isLoading, isSuccess }] =
    useUserLoginMutation();

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      userLogin(values);
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(login({ userData: data, token: data.token }));
    }
  }, [isSuccess, data]);

  return (
    <main className="flex w-full min-h-screen items-stretch bg-slate-50">
      <div className="flex-shrink-0 md:flex-shrink-1 flex-1 min-h-screen bg-black">
        <img src={loginImage} className="w-full opacity-80 min-h-screen object-cover" alt="reload page" />
      </div>
      <div className="bg-white py-4 px-2 max-w-4xl w-full">
      <Form {...form}>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto">
            <img className="mx-auto h-10 w-auto" src="src/assets/images/logo.png" alt="Logo" />
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 mx-auto w-full">
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="name"
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex-1"></div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="underline font-semibold leading-6 text-foreground hover:text-secondary-foreground"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-full"
                  loading={isLoading}
                >
                  Sign in
                </Button>
                {isError && (
                  <FormDescription className="text-destructive font-[14px] absolute -bottom-8">
                    Invalid Credentials. Please enter valid credentials to
                    login.
                  </FormDescription>
                )}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="#"
                className="underline font-semibold leading-6 text-foreground hover:text-secondary-foreground"
              >
                Register Now
              </a>
            </p>
          </div>
        </div>
      </Form>
      </div>
    
    </main>
  );
}
